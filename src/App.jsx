/** @format */

import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Card, Spin, Button, Space } from 'antd';
import axios from 'axios';
import AddAuthor from './modals/AddAuthor';
/*
bookRouter.post('/add-new-book', addNew);
bookRouter.post('/add-author', addAuthor);
bookRouter.post('/add-category', addCategories);
bookRouter.post('/add-chapter', addChapter);
bookRouter.get('/get-chapters', getChapters);
bookRouter.get('/get-books', getBooks);
bookRouter.get('/get-authors', getAuthors);
bookRouter.get('/get-categories', getCategories);
*/

const baseUrl = 'http://localhost:3001/books';

const App = () => {
	const [categories, setCategories] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isVisibleModalAuthor, setIsVisibleModalAuthor] = useState(false);

	useEffect(() => {
		getDatas();
	}, []);

	const getDatas = async () => {
		setIsLoading(true);
		try {
			await getAuthors();
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	const getAuthors = async () => {
		const api = `${baseUrl}/get-authors`;
		const res = await axios.get(api);

		const items = [];

		if (res && res.data && res.data.data.length > 0) {
			const data = res.data.data;

			data.forEach((item) =>
				items.push({
					label: item.name,
					value: item._id,
				})
			);

			setAuthors(items);
		}
	};

	const [form] = Form.useForm();

	const handleAddNewBook = (values) => {
		console.log(values);
	};

	return isLoading ? (
		<Spin />
	) : (
		<Card className='col-6 offset-3 mt-4'>
			<Form
				onFinish={handleAddNewBook}
				form={form}
				layout='vertical'
				size='large'>
				<Form.Item name={'title'} label='Title'>
					<Input />
				</Form.Item>

				<Form.Item name={'author'} label='Auhor'>
					<div className='row'>
						<div className='col-9'>
							<Select options={authors} />
						</div>
						<div className='col-3'>
							<Button onClick={() => setIsVisibleModalAuthor(true)}>
								Add new
							</Button>
						</div>
					</div>
				</Form.Item>

				<Form.Item name={'categories'} label='Categories'>
					<Select mode='multible'></Select>
				</Form.Item>
			</Form>

			<Button type='primary' onClick={() => form.submit()}>
				Submit
			</Button>

			<AddAuthor
				isVisible={isVisibleModalAuthor}
				onClose={() => {
					setIsVisibleModalAuthor(false);
					getAuthors();
				}}
			/>
		</Card>
	);
};

export default App;
