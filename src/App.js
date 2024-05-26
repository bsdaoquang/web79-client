/** @format */

import { List } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:3001';

const App = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	const getPosts = async () => {
    setIsLoading(true)
		try {
      const api = `${baseUrl}/posts`
      const res = await axios(api)

      if (res && res.data && res.status === 200) {
        setPosts(res.data.data)
      }
      setIsLoading(false)
		} catch (error) {
			console.log(error);
      setIsLoading(false)
		}
	};

	return <div>
    <List pagination dataSource={posts} loading={isLoading} renderItem={(item) => <List.Item key={item.id}>
      <List.Item.Meta title={item.title} description={item.body} />
    </List.Item>} />
  </div>;
};

export default App;
