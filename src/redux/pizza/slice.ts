import { createSlice } from "@reduxjs/toolkit";
import { PizzaSliceState, Status } from "./types";
import { getPizzas } from "./asycnActions";

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

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer