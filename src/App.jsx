/** @format */

import React, { useEffect, useState } from 'react';
import TasksScreen from './screens/TasksScreen';
import LoginScreen from './screens/LoginScreen';
import { Spin } from 'antd';

const App = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const res = localStorage.getItem('user');
		if (res) {
			const user = JSON.parse(res);
			setIsLoading(true);
			if (user.accesstoken) {
				setIsLogin(true);
			} else {
				setIsLogin(false);
			}

			setIsLoading(false);
		}
	}, []);

	return (
		<div>
			{isLoading ? <Spin /> : isLogin ? <TasksScreen /> : <LoginScreen />}
		</div>
	);
};

export default App;
