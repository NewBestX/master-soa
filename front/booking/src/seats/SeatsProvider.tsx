import React, {useCallback, useContext, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {getLogger} from '../core';
import {SeatProps} from './SeatProps';
import {newWebSocket, deleteItemApi, createItemApi, getItemsApi} from './seatsApi';

const log = getLogger('SeatsProvider');

type SaveItemFn = (item: SeatProps) => Promise<any>;
type DeleteItemFn = (item: SeatProps) => Promise<any>;

export interface SeatsState {
    items?: SeatProps[],
    fetching: boolean,
    fetchingError?: Error | null,
    saving: boolean,
    shouldFetch: boolean,
    savingError?: Error | null,
    saveItem?: SaveItemFn,
    deleteItem?: DeleteItemFn,
}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialState: SeatsState = {
    fetching: false,
    saving: false,
    shouldFetch: true,
    items: [
        {id: 5, reservedUser: "test"},
        {id: 6, reservedUser: "test"},
        {id: 55, reservedUser: "test2"}
    ]
};

const FETCH_ITEMS_STARTED = 'FETCH_ITEMS_STARTED';
const FETCH_ITEMS_SUCCEEDED = 'FETCH_ITEMS_SUCCEEDED';
const FETCH_ITEMS_FAILED = 'FETCH_ITEMS_FAILED';
const SAVE_ITEM_STARTED = 'SAVE_ITEM_STARTED';
const SAVE_ITEM_SUCCEEDED = 'SAVE_ITEM_SUCCEEDED';
const SAVE_ITEM_FAILED = 'SAVE_ITEM_FAILED';
const DELETE_ITEM_STARTED = 'DELETE_ITEM_STARTED';
const DELETE_ITEM_SUCCEEDED = 'DELETE_ITEM_SUCCEEDED';
const DELETE_ITEM_FAILED = 'DELETE_ITEM_FAILED';
const OUTSIDE_EVENT = 'OUTSIDE_EVENT';

const reducer: (state: SeatsState, action: ActionProps) => SeatsState =
    (state, {type, payload}) => {
        switch (type) {
            case FETCH_ITEMS_STARTED:
                return {...state, fetching: true, fetchingError: null};
            case FETCH_ITEMS_SUCCEEDED:
                return {...state, items: payload.items, fetching: false, shouldFetch: false};
            case FETCH_ITEMS_FAILED:
                return {...state, fetchingError: payload.error, fetching: false, shouldFetch: false};
            case SAVE_ITEM_STARTED:
                return {...state, savingError: null, saving: true};
            case SAVE_ITEM_SUCCEEDED:
                const items1 = [...(state.items || [])];
                const item1 = payload.item;
                const index1 = items1.findIndex(it => it.id === item1.id);
                if (index1 === -1) {
                    items1.splice(0, 0, item1);
                } else {
                    items1[index1] = item1;
                }
                return {...state, items: items1, saving: false};
            case SAVE_ITEM_FAILED:
                return {...state, savingError: payload.error, saving: false};
            case DELETE_ITEM_STARTED:
                return {...state, savingError: null, saving: true};
            case DELETE_ITEM_SUCCEEDED:
                const items2 = [...(state.items || [])];
                const item2 = payload.item;
                const index2 = items2.findIndex(it => it.id === item2.id);
                if (index2 !== -1) {
                    items2.splice(index2, 1);
                }
                return {...state, items: items2, saving: false};
            case DELETE_ITEM_FAILED:
                return {...state, savingError: payload.error, saving: false};
            case OUTSIDE_EVENT:
                return {...state, shouldFetch: true}
            default:
                return state;
        }
    };

export const ItemContext = React.createContext<SeatsState>(initialState);

interface ItemProviderProps {
    token: string,
    room: string,
    children: PropTypes.ReactNodeLike,
}

export const SeatsProvider: React.FC<ItemProviderProps> = ({token, room, children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {items, fetching, fetchingError, saving, savingError, shouldFetch} = state;
    useEffect(getItemsEffect, [token, shouldFetch]);
    useEffect(wsEffect, [token]);
    const saveItem = useCallback<SaveItemFn>(saveItemCallback, [token]);
    const deleteItem = useCallback<DeleteItemFn>(deleteItemCallback, [token]);
    const value = {items, fetching, fetchingError, shouldFetch, saving, savingError, saveItem, deleteItem};
    log('returns');
    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    );

    function getItemsEffect() {
        let canceled = false;
        fetchItems();
        return () => {
            canceled = true;
        }

        async function fetchItems() {
            if (!token?.trim()) {
                return;
            }
            if (!shouldFetch)
                return;
            try {
                log('fetchItems started');
                dispatch({type: FETCH_ITEMS_STARTED});
                const items = await getItemsApi(token, room);
                log('fetchItems succeeded, received ' + items.length + ' seats');
                console.log(JSON.stringify(items))
                if (!canceled) {
                    dispatch({type: FETCH_ITEMS_SUCCEEDED, payload: {items: items}});
                }
            } catch (error) {
                log('fetchItems failed');
                dispatch({type: FETCH_ITEMS_FAILED, payload: {error}});
            }
        }
    }

    async function saveItemCallback(item: SeatProps) {
        try {
            log('saveItem started');
            dispatch({type: SAVE_ITEM_STARTED});
            const savedItem = await (createItemApi(token, room, item));
            log('saveItem succeeded');
            dispatch({type: SAVE_ITEM_SUCCEEDED, payload: {item: savedItem}});
        } catch (error) {
            log('saveItem failed');
            dispatch({type: SAVE_ITEM_FAILED, payload: {error}});
        }
    }

    async function deleteItemCallback(item: SeatProps) {
        try {
            log('deleteItem started');
            dispatch({type: DELETE_ITEM_STARTED});
            await (deleteItemApi(token, room, item));
            log('deleteItem succeeded');
            dispatch({type: DELETE_ITEM_SUCCEEDED, payload: {item: item}});
        } catch (error) {
            log('deleteItem failed');
            dispatch({type: DELETE_ITEM_FAILED, payload: {error}});
        }
    }

    function wsEffect() {
        let canceled = false;
        log('wsEffect - connecting');
        let closeWebSocket: () => void;
        if (token?.trim()) {
            closeWebSocket = newWebSocket(token, message => {
                if (canceled) {
                    return;
                }
                const {event} = message;
                log(`ws message, item ${event}`);
                if (event === 'created' || event === 'deleted') {
                    dispatch({type: OUTSIDE_EVENT});
                }
            });
        }
        return () => {
            log('wsEffect - disconnecting');
            canceled = true;
            closeWebSocket?.();
        }
    }
};
