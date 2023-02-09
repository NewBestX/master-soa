import axios from 'axios';
import {authConfig, baseUrl, getLogger, withLogs} from '../core';
import {IMovie} from "./MainView";

const itemUrl = `http://${baseUrl}/api/movie`;

export const getMovieApi: (token: string) => Promise<IMovie> = (token) => {
    return withLogs(axios.get(`${itemUrl}`, authConfig(token)), 'getMovieApi');
}
