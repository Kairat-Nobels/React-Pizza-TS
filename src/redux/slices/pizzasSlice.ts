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
interface PizzaSliceState {
    pizzas: Pizza[],
    status: 'loading' | 'success' | 'error'
}

export const getPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
    'pizzas/getPizzas',
    async (params) => {
        const { categor, currentPage, sortBy, order, search } = params;
        const { data } = await axios.get<Pizza[]>(`https://64d20f21f8d60b1743615e6b.mockapi.io/items?page=${categor ? 1 : currentPage}&limit=4&${categor}&sortBy=${sortBy}&order=${order}${search}`)

        return data
    }
)
const initialState: PizzaSliceState = {
    pizzas: [],
    status: 'loading'
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
            state.status = 'loading';
            state.pizzas = []
        })
        builder.addCase(getPizzas.fulfilled, (state, action) => {
            state.status = 'success';
            state.pizzas = action.payload;
        })
        builder.addCase(getPizzas.rejected, (state) => {
            state.status = 'error';
            state.pizzas = []
        })
    },
})

export const selectPizza = (s: RootState) => s.pizzas
export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer