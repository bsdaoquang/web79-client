/** @format */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from '../screens/LoginScreen';
import Register from '../screens/Register';

const AuthRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<LoginScreen />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	);
};

export default AuthRouter;
