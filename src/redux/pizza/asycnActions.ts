import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzaParams } from "./types";
import axios from "axios";

export const getPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizzas/getPizzas',
    async (params) => {
        const { category, currentPage, sortBy, order, search } = params;
        const { data } = await axios.get<Pizza[]>(`https://64d20f21f8d60b1743615e6b.mockapi.io/items?page=${category ? 1 : currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)

        return data
    }
)