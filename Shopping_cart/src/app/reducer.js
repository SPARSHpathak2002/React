import {ADD_TO_CART, REMOVE_FROM_CART } from "./Actiontypes"
const initialState = {
    CartItems: [],
    Quantity:0,
    TotalPrice:0

}
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                Quantity: state.Quantity + 1,
                CartItems: state.CartItems.concat(action.payload)
            }
        case REMOVE_FROM_CART:
            return {
                Quantity:state.Quantity - 1,
                CartItems:[
                ...state.CartItems.filter(item=>item.id !== action.payload)
                ]
            }
        default:
            return  state
    }
}