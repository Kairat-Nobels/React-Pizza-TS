import './categories.css';

function Categories({category, setCategory})
{
    const categories = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']
    return (
        <div className="categories">
            <ul>    
                {categories.map((value, index) => <li onClick={()=>setCategory(index)} key={index} className={category === index ? 'active' : ''}>{value}</li>)}
            </ul>
        </div>
    )
}
export default Categories