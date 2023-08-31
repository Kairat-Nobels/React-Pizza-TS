import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,
    count?: number,
    sum?: number
}

interface CartSliceState {
    totalPrice: number,
    totalCount: number,
    items: CartItem[]
}

const initialState: CartSliceState = {
    totalPrice: 0,
    totalCount: 0,
    items: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addCart(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem && findItem.count && findItem.sum) {
                findItem.count++
                findItem.sum += action.payload.price;
            } else {
                state.items.push({ ...action.payload, count: 1, sum: action.payload.price })
            }

            state.totalPrice += action.payload.price;
            state.totalCount++
        },
        plusCart(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload)
            if (findItem && findItem.count && findItem.sum) {
                findItem.count++
                findItem.sum += findItem.price
                state.totalCount++;
                state.totalPrice += findItem.price
            }
        },
        minusCart(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload)
            if (findItem && findItem.count && findItem.sum) {
                findItem.count--
                findItem.sum -= findItem.price
                state.totalCount--;
                state.totalPrice -= findItem.price
            }
        },
        removeCart(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload)
            if (findItem && findItem.count && findItem.sum) {
                state.totalCount -= findItem.count
                state.totalPrice -= findItem?.sum
                state.items = state.items.filter(obj => obj.id !== action.payload)
            }
        },
        clearCart(state) {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        }
    }
})

export const selectCart = (s: RootState) => s.cart
export const { addCart, clearCart, removeCart, plusCart, minusCart } = cartSlice.actions
export default cartSlice.reducer