import React, { useRef } from "react";
import Categories from '../components/Categories/Categories'
import Sort, { sortList } from '../components/Sort/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeloton'
import { useEffect } from 'react'
import Pagination from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { selectFilter, setCategory, setCurrentPage, setFilters, setSort } from "../redux/slices/filterSlice";
import qs from 'qs'
import { useNavigate } from "react-router-dom";
import { SearchPizzaParams, getPizzas, selectPizza } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { pizzas, status } = useSelector(selectPizza)
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

    const asyncPizza = async () =>
    {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : 0
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            // @ts-ignore
            getPizzas({ category, currentPage, sortBy, order, search }
        ))
    }
    // URL parsing and save
    useEffect(() =>
    {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }
        
        isMounted.current = true
    }, [categoryId, sort, currentPage])

    useEffect(() =>
    {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            
            dispatch(setFilters({
                searchValue: params.search,
                categoryId: Number(params.categoryId),
                currentPage: Number(params.currentPage),
                sort: sort || sortList[0]
            }))
            isSearch.current = true
        }
    }, [])

    useEffect(() =>
    {
        window.scrollTo(0, 0)
        if (!isSearch.current) asyncPizza()
        isSearch.current = false
    }, [categoryId, sort, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories category={categoryId} setCategory={(i) => dispatch(setCategory(i))} />
                <Sort sort={sort} setSort={(i: any) => dispatch(setSort(i))} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                </div>
                    :
                    <div className="content__items">
                        {
                            status === 'loading' ? [...new Array(4)].map((_, i) => <Skeleton key={i} />) : pizzas?.length > 0 ? pizzas.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />)
                                : <div className="content__error-info">
                                    <h2>По вашему запросу ничего не найдено</h2>
                                </div>
                        }
                    </div>
            }
            {categoryId === 0 && pizzas.length > 0 && !searchValue && <Pagination currentPage={currentPage} onChangePage={(num: number) => dispatch(setCurrentPage(num))} />}
        </div>
    )
}
export default Home