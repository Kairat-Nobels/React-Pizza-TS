import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalCount = (items: CartItem[]) => {
    if (items.length > 0) {
        let count = 0;
        for (let i of items) {
            if (i.count) count += i.count
            else count++
        }
        return count
    }
    else return 0
}