import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";
import React from "react"

type CategoriesProps = {
    category: number;
    setCategory: (i: number) => void;
    getCategories?: (categories: string[]) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesProps> = React.memo(({ getCategories, category, setCategory }) => {
    getCategories?.(categories)

    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) => <li onClick={() => setCategory(index)} key={index} className={category === index ? 'active' : ''}>{value}</li>)}
            </ul>
        </div>
    )
})
export default Categories