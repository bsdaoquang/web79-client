/** @format */

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';

const MainRouter = () => {
	// get data from local storage or api
	return (
		<Routes>
			<Route path='/' element={<HomeScreen />} />
		</Routes>
	);
};

export default MainRouter;
