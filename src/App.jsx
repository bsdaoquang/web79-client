/** @format */

import { Button, Input, List, Pagination, Slider } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { replaceName } from './replaceName';

const baseUrl = `http://localhost:3001/posts`;

const App = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchKey, setSearchKey] = useState('');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [filterValues, setFilterValues] = useState([0, 0]);

	useEffect(() => {
		getPosts();
	}, [page]);

	useEffect(() => {
		!searchKey && getPosts();
	}, [searchKey]);

	const getPosts = async () => {
		const api = `/posts?page=${page}&pageSize=10`;
		setIsLoading(true);
		try {
			const res = await axios(`${baseUrl}${api}`);

			if (res && res.status === 200 && res.data) {
				const data = res.data.data;

				setPosts(data.items);
				setTotalPages(data.totalPages);
			}

			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleSearchPosts = async () => {
		const api = `/search-posts?title=${replaceName(searchKey)}`;
		try {
			const res = await axios(`${baseUrl}${api}`);
			if (res && res.data && res.status === 200) {
				setPosts(res.data.data);
				setTotalPages(0);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleFilter = async () => {
		const api = `/filter-price?min=${filterValues[0]}&max=${filterValues[1]}`;
		try {
			const res = await axios(`${baseUrl}${api}`);
			if (res && res.data && res.status === 200) {
				setPosts(res.data.data);
				setTotalPages(0);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className='container mt-4 mb-4'>
				<div className='row'>
					<div className='col-8 offset-2'>
						<div className='mb-3'>
							<Input.Search
								size='large'
								onPressEnter={handleSearchPosts}
								onSearch={handleSearchPosts}
								value={searchKey}
								placeholder='Search'
								prefix={<BiSearch size={20} color='#676767' />}
								onChange={(val) => setSearchKey(val.target.value)}
							/>
						</div>
						<div className='mb-4'>
							<div className='row'>
								<div className='col'>
									<Slider
										range
										defaultValue={[100000, 10000000]}
										max={10000000}
										step={10000}
										onChange={(vals) => setFilterValues(vals)}
									/>
								</div>
								<Button onClick={handleFilter}>Filter</Button>
							</div>
						</div>
						<List
							loading={isLoading}
							dataSource={posts}
							renderItem={(item) => (
								<List.Item key={item._id}>
									<List.Item.Meta title={item.title} description={item.body} />
									{item.price.toLocaleString()}
								</List.Item>
							)}
						/>
						<Pagination total={totalPages} onChange={(val) => setPage(val)} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
