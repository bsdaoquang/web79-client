/** @format */

import { Avatar, Form, Input, Modal } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

const baseUrl = 'http://localhost:3001/books';

const AddAuthor = (props) => {
	const { isVisible, onClose, author } = props;

	const [file, setFile] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const [form] = Form.useForm();

	const handleClose = () => {
		setFile(undefined);
		form.resetFields();
		onClose();
	};

	const handleAddNewAuthor = async (values) => {
		const { name, bio } = values;

		const formData = new FormData();

		formData.append('name', name ?? '');
		formData.append('bio', bio ?? '');

		if (file) {
			formData.append('file', file);
		}

		const api = `/add-author`;
		try {
			const res = await axios(`${baseUrl + api}`, {
				method: 'post',
				headers: {},
				data: formData,
			});

			handleClose();
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};
	return (
		<Modal
			isLoading={isLoading}
			title='Add author'
			open={isVisible}
			onCancel={handleClose}
			onOk={() => form.submit()}>
			{file && <Avatar src={URL.createObjectURL(file)} size={120} />}
			<Input
				className='mt-3 mb-3'
				type='file'
				onChange={(val) => setFile(val.target.files[0])}
				accept='image/*'
			/>
			<Form
				disabled={isLoading}
				form={form}
				layout='vertical'
				onFinish={handleAddNewAuthor}>
				<Form.Item name={'name'} label='Name'>
					<Input />
				</Form.Item>
				<Form.Item name={'bio'} label='Bio'>
					<Input.TextArea rows={3} placeholder='Bio' />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddAuthor;
