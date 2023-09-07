import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const getPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizzas/getPizzas',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get<Pizza[]>(`https://64d20f21f8d60b1743615e6b.mockapi.io/items`, {
            params: pickBy(
                {
                    page: search ? 1 : currentPage,
                    limit: 4,
                    category,
                    sortBy,
                    order,
                    search,
                },
                identity,
            ),
        });

        return data;
    },
);