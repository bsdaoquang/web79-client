/** @format */

import { Button, Card, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addAuth } from '../redux/reducers/authReducer';

const LoginScreen = () => {
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	const handleLogin = async (values) => {
		const api = `/auth/login`;

		try {
			const res = await axios({
				method: 'post',
				url: `http://localhost:3001${api}`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: values,
			});

			if (res && res.status === 200 && res.data) {
				const data = res.data.data;
				dispatch(addAuth(data));
				localStorage.setItem('user', JSON.stringify(data));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className='container'>
				<div className='col-6 offset-3 mt-4'>
					<Card>
						<h1>Login</h1>
						<Form form={form} layout='vertical' onFinish={handleLogin}>
							<Form.Item
								name={'username'}
								rules={[
									{
										required: true,
										message: 'Email is requires',
									},
								]}>
								<Input placeholder='Email' />
							</Form.Item>
							<Form.Item
								name={'password'}
								rules={[
									{
										required: true,
										message: 'Password is requires',
									},
								]}>
								<Input.Password placeholder='Password' />
							</Form.Item>
						</Form>

						<div className='mt-2 text-right'>
							<Button type='primary' onClick={() => form.submit()}>
								Login
							</Button>
						</div>

						<div className='mt-3 text-center'>
							<Link to={'/register'}>Register</Link>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default LoginScreen;
