/** @format */

import { Button, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

const UploadFile = () => {
	const [file, setFile] = useState();

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append('file', file);

		const api = `https://web-79-server.onrender.com/upload`;
		try {
			const res = await axios(api, {
				method: 'post',
				headers: {},
				data: formData,
			});

			if (res && res.status === 200 && res.data) {
				console.log(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<div className='container mt-4'>
				<Input
					type='file'
					onChange={(val) => setFile(val.target.files[0])}
					name=''
					id=''
				/>
			</div>
			<Button onClick={handleUpload}>Upload</Button>
		</div>
	);
};

export default UploadFile;
