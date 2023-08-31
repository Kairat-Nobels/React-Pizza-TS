import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Pizza = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    rating: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface PizzaSliceState {
    pizzas: Pizza[],
    status: Status
}

export type SearchPizzaParams = {
    categoryId: number, currentPage: string, sortProperty: string, order: string, search: string
}
export const getPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizzas/getPizzas',
    async (params) => {
        const { categoryId, currentPage, sortProperty, order, search } = params;
        const { data } = await axios.get<Pizza[]>(`https://64d20f21f8d60b1743615e6b.mockapi.io/items?page=${categoryId ? 1 : currentPage}&limit=4&${categoryId}&sortBy=${sortProperty}&order=${order}${search}`)

        return data
    }
)
const initialState: PizzaSliceState = {
    pizzas: [],
    status: Status.LOADING
}
const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.pizzas = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.pizzas = []
        })
        builder.addCase(getPizzas.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.pizzas = action.payload;
        })
        builder.addCase(getPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.pizzas = []
        })
    },
})

export const selectPizza = (s: RootState) => s.pizzas
export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer