import axios from 'axios';
import {authConfig, baseUrl, getLogger, withLogs} from '../core';
import {SeatProps} from './SeatProps';

const itemUrl = `http://${baseUrl}/api/seat`;

export const getItemsApi: (token: string, room: string) => Promise<SeatProps[]> = (token, room) => {
    return withLogs(axios.get(`${itemUrl}/${room}`, authConfig(token)), 'getItems');
}

export const createItemApi: (token: string, room: string, item: SeatProps) => Promise<SeatProps[]> = (token, room, item) => {
    return withLogs(axios.post(`${itemUrl}/${room}`, item, authConfig(token)), 'createItem');
}

export const deleteItemApi: (token: string, room: string, item: SeatProps) => Promise<boolean> = (token, room, item) => {
    return withLogs(axios.delete(`${itemUrl}/${room}/${item.id}`, authConfig(token)), 'deleteItem');
}

interface MessageData {
    type: string;
}

const log = getLogger('ws');

export const newWebSocket = (token: string, onMessage: (data: MessageData) => void) => {
    const ws = new WebSocket(`ws://${baseUrl}`);
    ws.onopen = () => {
        log('web socket onopen');
        ws.send(JSON.stringify({type: 'authorization', payload: {token}}));
    };
    ws.onclose = () => {
        log('web socket onclose');
    };
    ws.onerror = error => {
        log('web socket onerror', error);
    };
    ws.onmessage = messageEvent => {
        log('web socket onmessage');
        onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
        ws.close();
    }
}
