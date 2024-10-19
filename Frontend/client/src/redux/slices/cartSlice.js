import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addCart = createAsyncThunk(
    'addCart',
    (product) => {
        return product;
    }
)

export const deleteProductCart = createAsyncThunk(
    'deleteProductCart',
    async (idProduct) => {
        return idProduct;
    },
)

// export const handleQuantityCart = createAsyncThunk(
//     'handleQuantity',
//     async (product) => {
//         return product;
//     },
// )

export const increaseQuantity = createAsyncThunk(
    'cart/increase',
    async (idProduct) => {
        return idProduct;
    }
)

export const decreaseQuantity = createAsyncThunk(
    'cart/decrease',
    async (idProduct) => {
        return idProduct;
    }
)

export const clearCart = createAsyncThunk(
    'cart/clear',
    () => {
        return;
    },
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        cart: [],
        quantity: 0,
        amount: 0,
        error: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(addCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                const itemIndex = state.cart.findIndex(item => item.id === action.payload.product.id);
                if (itemIndex >= 0) {
                    state.cart[itemIndex].quantity += action.payload.quantity;
                    state.amount += action.payload.product.price * action.payload.quantity;
                } else {
                    const tempProduct = { ...action.payload.product, quantity: action.payload.quantity };
                    state.cart.push(tempProduct);
                    state.amount += action.payload.product.price;
                    state.quantity += 1;
                }
                // state.cart = [];
                // state.quantity = 0;
                // state.amount = 0;
                state.loading = false;
                state.error = null;
            })
            .addCase(addCart.rejected, (state) => {
                state.loading = false;
                state.error = 'error cart';
            })

            //delete cart
            .addCase(deleteProductCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProductCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const itemIndex = state.cart.findIndex((element => element.id === action.payload));
                if (itemIndex !== -1) {
                    state.amount -= state.cart[itemIndex].price * state.cart[itemIndex].quantity;
                    state.cart.splice(itemIndex, 1);
                    state.quantity -= 1;
                }
            })
            .addCase(deleteProductCart.rejected, (state) => {
                state.loading = false;
                state.error = 'error delete cart';
            })

            // Handle increase quantity
            .addCase(increaseQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(increaseQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const itemIndex = state.cart.findIndex((element => element.id === action.payload));
                if (itemIndex !== -1) {
                    state.cart[itemIndex].quantity += 1;
                    state.amount += state.cart[itemIndex].price;
                }
            })
            .addCase(increaseQuantity.rejected, (state) => {
                state.loading = false;
                state.error = 'error quantity cart';
            })

            // Handle decrease quantity
            .addCase(decreaseQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(decreaseQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const itemIndex = state.cart.findIndex((element => element.id === action.payload));
                if (state.cart[itemIndex].quantity > 1) {
                    state.cart[itemIndex].quantity -= 1;
                    state.amount -= state.cart[itemIndex].price;
                } else {
                    state.amount -= state.cart[itemIndex].price;
                    state.cart.splice(itemIndex, 1);
                    state.quantity -= 1;
                }
            })
            .addCase(decreaseQuantity.rejected, (state) => {
                state.loading = false;
                state.error = 'error quantity cart';
            })

            //Handle clear cart 
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.amount = 0;
                state.quantity = 0;
                state.cart = [];
            })
            .addCase(clearCart.rejected, (state) => {
                state.loading = true;
                state.error = null;
            })
    }
});

export default cartSlice.reducer;