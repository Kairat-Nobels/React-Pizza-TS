import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPizzas = createAsyncThunk('pizzas/getPizzas', async ({ categor, currentPage, sortBy, order, search }) =>
{
    const { data } = await axios.get(`https://64d20f21f8d60b1743615e6b.mockapi.io/items?page=${categor ? 1 : currentPage}&limit=4&${categor}&sortBy=${sortBy}&order=${order}${search}`)
    return data
}
)
const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState: {
        pizzas: [],
        status: 'loading'
    },
    reducers: {
        setPizzas(state, action)
        {
            state.pizzas = action.payload;
        }
    },
    extraReducers: builder =>
    {
        builder.addCase(getPizzas.pending, (state) =>
        {
            state.status = 'loading';
            state.pizzas = []
        })
        builder.addCase(getPizzas.fulfilled, (state, action) =>
        {
            state.status = 'success';
            state.pizzas = action.payload;
        })
        builder.addCase(getPizzas.rejected, (state) =>
        {
            state.status = 'error';
            state.pizzas = []
        })
    },
})

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer