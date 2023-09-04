export type Pizza = {
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

export interface PizzaSliceState {
    pizzas: Pizza[],
    status: Status
}

export type SearchPizzaParams = {
    category: number, currentPage: string, sortBy: string, order: string, search: string
}