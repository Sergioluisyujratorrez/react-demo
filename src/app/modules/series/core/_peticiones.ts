// fetch  = promesas .json()

// axios 

import axios from "axios";
import { Serie } from "./_modelos";

const API_URL = import.meta.env.VITE_APP_TVMAZE_API_URL;
// console.log("URL base de la api", API_URL);

const tvmaze = axios.create({baseURL: API_URL});

// endpoints
// get
export const obtenerSeries = () => tvmaze.get<Array<Serie>>('/shows') 