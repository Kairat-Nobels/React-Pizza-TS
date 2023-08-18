import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function FullPizza()
{
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        description: string;
        price: number;
    }>();
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() =>
    {
        async function getPizza()
        {
            try {
                const { data } = await axios.get('https://64d20f21f8d60b1743615e6b.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                console.log(error);
                alert('Ошибка при получении пиццы!')
                navigate('/')
            }
        }
        getPizza()
    }, [])
    
    if (!pizza) return 'Загрузка...'
    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="img" />
            <h2>{pizza.title}</h2>
            <p>{pizza.description}</p>
            <h4>{pizza.price} сом</h4>
            <Link to='/'>
                <button className='button button--outline button--add'><span>Назад</span></button>
            </Link>
        </div>
    )
}

export default FullPizza