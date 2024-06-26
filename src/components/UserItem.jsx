/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserItem = ({ id }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		getUserDetail();
	}, [id]);

	const getUserDetail = async () => {
		const api = `https://web-79-server.onrender.com/auth/user/${id}`;

		try {
			const res = await axios(api);

			if (res && res.data && res.status === 200) {
				setUser(res.data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return <div>{user && <p>{user.name}</p>}</div>;
};

export default UserItem;
