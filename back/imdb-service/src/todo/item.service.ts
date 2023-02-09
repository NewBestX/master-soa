import {Injectable} from '@nestjs/common';
import axios from "axios";

const baseUrl = 'http://www.omdbapi.com/?apikey=6c29a6ab&i=';
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

@Injectable()
export class ItemService {
    constructor() {
    }

    getImdbObject(id: string): Promise<any> {
        return axios.get(baseUrl + id, config);
    }
}
