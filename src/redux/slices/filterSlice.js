import { createSlice } from "@reduxjs/toolkit"



const filterSlice = createSlice({
    name: 'filterSlice',
    initialState: {
        searchValue: '',
        categoryId: 0,
        currentPage: 1,
        sort: {
            name: 'популярности (ASC)',
            sortProperty: '-rating'
        }
    },
    reducers: {
        setCategory(state, action)
        {
            state.categoryId = action.payload
        },
        setSearchValue(state, action)
        {
            state.searchValue = action.payload
        },
        setSort(state, action)
        {
            state.sort = action.payload
        },
        setCurrentPage(state, action)
        {
            state.currentPage = action.payload
        },
        setFilters(state, action)
        {
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sort = action.payload.sort
        }
    }
})

export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer;