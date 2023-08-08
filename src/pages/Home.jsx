import React from "react";
import Categories from '../components/Categories/Categories'
import Sort from '../components/Sort/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeloton'
import { useEffect, useState } from 'react'
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
// import pizzas from './assets/pizzas.json'
function Home()
{
    const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [sort, setSort] = useState({
        name: 'популярности (DESC)',
        value: 'rating'
    })
    useEffect(() =>
    {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() =>
    {
        setIsLoading(true)

        const sortBy = sort.value.replace('-', '')
        const order = sort.value.includes('-') ? 'asc' : 'desc'
        const categor = category > 0 ? `category=${category}` : ''
        const search = searchValue ? `&search=${searchValue}` : '';
        // fetch(`https://64d20f21f8d60b1743615e6b.mockapi.io/items?page=${currentPage}&limit=4&${categor}&sortBy=${sortBy}&order=${order}`)
        fetch(`https://64d20f21f8d60b1743615e6b.mockapi.io/items?page=${currentPage}&limit=4&${categor}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) =>
            {
                return res.json();
            }).then((json) =>
            {
                setItems(json);
                setIsLoading(false)
            })
    }, [category, sort, searchValue, currentPage])
    // [category, sort, searchValue]

    return (
        <div className="container">
            <div className="contentTop">
                <Categories category={category} setCategory={(i) => setCategory(i)} />
                <Sort sort={sort} setSort={(i) => setSort(i)} />
            </div>
            <h2 className="contentTitle">Все пиццы</h2>
            <div className="contentItems">
                {
                    isLoading ? [...new Array(6)].map((_, i) => <Skeleton key={i} />) : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    )
}
export default Home