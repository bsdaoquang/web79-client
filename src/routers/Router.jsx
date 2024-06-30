/** @format */

import React, { useEffect } from 'react';
import MainRouter from './MainRouter';
import AuthRouter from './AuthRouter';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSeletor } from '../redux/reducers/authReducer';
import { sync } from '../redux/reducers/cartReducer';

const Router = () => {
	const auth = useSelector(authSeletor);
	const dispatch = useDispatch();

	useEffect(() => {
		const res = localStorage.getItem('user');
		const cart = localStorage.getItem('cart');

		if (res) {
			dispatch(addAuth(JSON.parse(res)));
		}

		if (cart) {
			dispatch(sync(JSON.parse(cart)));
		}
	}, []);

	return (
		<BrowserRouter>
			{auth && auth.accesstoken ? <MainRouter /> : <AuthRouter />}
		</BrowserRouter>
	);
};

export default Router;
