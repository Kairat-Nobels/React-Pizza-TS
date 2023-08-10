import { createSlice } from "@reduxjs/toolkit"



const filterSlice = createSlice({
    name: 'filterSlice',
    initialState: {
        categoryId: 0,
        currentPage: 1,
        sort: {
            name: 'популярности (ASC)',
            sortProperty: 'raiting'
        }
    },
    reducers: {
        setCategory(state, action)
        {
            state.categoryId = action.payload
        },
        setSort(state, action)
        {
            state.sort = action.payload
        },
        setCurrentPage(state, action)
        {
            state.currentPage = action.payload
        }
    }
})

export const { setCategory, setSort, setCurrentPage } = filterSlice.actions
export default filterSlice.reducer;