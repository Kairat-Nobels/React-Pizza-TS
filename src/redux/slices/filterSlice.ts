import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

type Sort = {
    name: string,
    sortProperty: '-rating' | 'rating' | '-price' | 'price' | 'title' | '-title'
}
interface filterSliceState {
    searchValue: string,
    categoryId: number,
    currentPage: number,
    sort: Sort
}

const initialState: filterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности (ASC)',
        sortProperty: '-rating'
    }
}
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<filterSliceState>) {
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sort = action.payload.sort
        }
    }
})

export const selectFilter = (s: RootState) => s.filter
export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer;