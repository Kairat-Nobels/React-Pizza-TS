import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
    if (items.length > 0) {
        let sum = 0;
        for (let i of items) {
            if (i.count) sum += i.count * i.price
            else sum += i.price
        }
        return sum
    }
    else return 0
}