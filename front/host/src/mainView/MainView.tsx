import React, {useContext, useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {getLogger} from "../core";
import {string} from "prop-types";
// @ts-ignore
import {AuthContext, AuthState} from 'remoteAuth/AuthProvider';
// @ts-ignore
import SeatsElement from 'remoteSeats/SeatsElement';
import {getMovieApi} from "./movieApi";


const log = getLogger('MainView');

export interface IMovie {
    room: string;
    title: string;
    year: string;
    imdbId: string;
    imageUrl: string;
    imdbRating?: string;
}

interface viewState {
    movie?: IMovie;
}

const MainView = () => {
    const [state, setState] = useState<viewState>({});
    // @ts-ignore
    const {username, token} = useContext<AuthState>(AuthContext);

    useEffect(fetchMovieEffect, []);

    function fetchMovieEffect() {
        let canceled = false;
        fetchMovie();
        return () => {
            canceled = true;
        }

        async function fetchMovie() {
            if (!token?.trim()) {
                return;
            }

            try {
                log('fetching movie');
                const movie: IMovie = await getMovieApi(token);
                log('fetch movie succeeded');
                if (!canceled) {
                    setState({movie});
                }
            } catch (error) {
                log('fetch movie failed');
            }
        }
    }

    if (!state.movie)
        return <div style={{fontSize: "xx-large", fontWeight: "bold"}}>Loading...</div>

    log("render...");
    log("you are " + username);
    return (
        <div style={{position: "absolute", left: 0, right: 0}}>
            <div className="container main-banner">
                <div className="picture">
                    <img
                        src={state.movie.imageUrl}
                        alt="Movie banner image"
                    />
                </div>
                <div className="rightBox">
                    <div>
                        <div className="movieTitle">{state.movie.title}</div>
                        <div className="movieDetails">({state.movie.year})</div>
                        <div className="movieDetails">IMDb rating: {state.movie.imdbRating}</div>
                    </div>
                </div>
            </div>
            <div className="container main-seats">
                <SeatsElement token={token} room={state.movie.room} user={username}/>
            </div>
        </div>
    );
};

export default MainView;
