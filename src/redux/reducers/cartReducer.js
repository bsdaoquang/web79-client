/** @format */

import { createSlice } from '@reduxjs/toolkit';

const syncCart = (data) => {
  localStorage.setItem('cart', JSON.stringify(data))
}

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		data: [],
	},
	reducers: {
    sync: (state, action) => {
      state.data = action.payload
    }
    ,
		addcart: (state, action) => {
			const items = state.data;
			const item = action.payload;
			const index = items.findIndex((element) => element._id === item._id);

			if (index !== -1) {
				items[index].quantity += 1;
			} else {
				items.push({ ...item, quantity: 1 });
			}

			state.data = items;
      syncCart(items)
		},

		removeItem: (state, action) => {
			const { id } = action.payload;
			const items = state.data;

			const index = items.findIndex((element) => element._id === id);
			if (index !== -1) {
				items.splice(index, 1);
			}

			state.data = items;
      syncCart(items)
		},

		updateQuantity: (state, action) => {
			const { id, num } = action.payload;
			const item = state.data.find((element) => element._id === id);
			const index = state.data.findIndex((element) => element._id === id);
			const items = state.data;


			if (item) {
				item.quantity = item.quantity + num;

				if (item.quantity === 0) {
					if (index !== -1) {
						items.splice(index, 1);
					}
				}

        items[index] = item

				state.data = items;
        syncCart(items)
			}
		},
	},
});

export const cartReducer = cartSlice.reducer;
export const { addcart, removeItem, updateQuantity, sync } = cartSlice.actions;
export const cartSeletor = (state) => state.cartReducer.data;
