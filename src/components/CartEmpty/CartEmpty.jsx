import React from 'react'
import empty from '../../assets/img/empty-cart.png'
import { Link } from 'react-router-dom'
import styles from './CartEmpty.module.css'
function CartEmpty()
{
    return (
        <div className={styles.cartEmpty}>
            <h2>Корзина пустая <span>😕</span></h2>
            <p>Вероятней всего, вы не заказывали ещё пиццу.</p>
            <p>Для того, чтобы заказать пиццу, перейдите на главную страницу.</p>
            <img src={empty} alt="img" />
            <Link to={'/'} className={styles.btnBack}>
                <span>Вернуться назад</span>
            </Link>
        </div>
    )
}

export default CartEmpty