/** @format */

import { Button, List } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserItem from './components/UserItem';

const baseUrl = 'http://localhost:3001';

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	const getPosts = async () => {
		setIsLoading(true);
		try {
			const api = `${baseUrl}/posts`;
			const res = await axios(api);

			if (res && res.data && res.status === 200) {
				setPosts(res.data.data);
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

  const handleRemovePost = async (id) => {
    const api = `${baseUrl}/post/${id}`

    try {
      await axios({
        method: 'delete',
        url: api,
      })

      getPosts()
    } catch (error) {
      console.log(error)
    }
  }

	return (
		<div style={{ padding: 20 }}>
			<List
				itemLayout='vertical'
				pagination
				dataSource={posts}
				loading={isLoading}
				renderItem={(item) => (
					<List.Item
						extra={
							<Button onClick={() => handleRemovePost(item.id)} type='primary' ghost>
								Del
							</Button>
						}
						key={item.id}>
						<List.Item.Meta title={item.title} description={item.body} />
						<UserItem id={item.userId} />
					</List.Item>
				)}
			/>
		</div>
	);
};

export default App;
