/** @format */

import { Button, Card, Input, List, Space, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';

// Axios client

const TasksScreen = () => {
	const [content, setContent] = useState('');
	const [isCreating, setIsCreating] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState();
	const [user, setuser] = useState();

	useEffect(() => {
		const res = localStorage.getItem('user');
		if (res) {
			const data = JSON.parse(res);
			if (data.accesstoken) {
				setuser(data);
			}
		}
	}, []);

	useEffect(() => {
		user && getTasks();
	}, [user]);

	useEffect(() => {
		if (task) {
			setContent(task.content);
		}
	}, [task]);

	const handleAddNewTask = async () => {
		if (!content) {
			message.error('Please enter your todo!');
		} else {
			setIsCreating(true);
			try {
				const res = await axios({
					method: task ? 'put' : 'post',
					url: `http://localhost:3001/tasks/${
						task ? `update-task?id=${task._id}` : 'add-new-task'
					}`,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearie ${user.accesstoken}`,
					},
					data: { content },
				});

				setTask(undefined);
				setContent('');
				setIsCreating(false);
				await getTasks();
			} catch (error) {
				console.log(error);
				setIsCreating(false);
			}
		}
	};

	const getTasks = async () => {
		const api = 'http://localhost:3001/tasks/get-tasks';
		try {
			const res = await axios({
				url: api,
				headers: {
					Authorization: `Bearie ${user.accesstoken}`,
				},
			});
			console.log(res);
			if (res && res.status === 200 && res.data) {
				setTasks(res.data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeTask = async (id) => {
		const api = `http://localhost:3001/tasks/remove-task?id=${id}`;
		try {
			await axios({
				method: 'delete',
				url: api,
			});

			await getTasks();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className='container'>
				<Button onClick={() => localStorage.clear()}>Logout</Button>
				<div className='row mt-3'>
					<div className='col-6 offset-3'>
						<Card title='Todo list'>
							<Input
								disabled={isCreating}
								value={content}
								onChange={(val) => setContent(val.target.value)}
								allowClear
								size='large'
								onPressEnter={() => handleAddNewTask()}
								placeholder='What do you want to do!'
							/>
							<div className='mt-2'>
								<List
									dataSource={tasks}
									renderItem={(item) => (
										<List.Item
											key={item._id}
											extra={
												<Space>
													<Button
														onClick={() => setTask(item)}
														type='text'
														icon={<BiEdit size={20} color='coral' />}
													/>
													<Button
														onClick={() => removeTask(item._id)}
														type='text'
														icon={<BiTrash size={20} color='red' />}
													/>
												</Space>
											}>
											<List.Item.Meta
												title={item.content}
												description={item.createdAt}
											/>
										</List.Item>
									)}
								/>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TasksScreen;
