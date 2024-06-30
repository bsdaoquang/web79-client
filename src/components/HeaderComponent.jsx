/** @format */

import { Badge, Button, Card, Dropdown, List, Space } from 'antd';
import React from 'react';
import {
	BiAddToQueue,
	BiBookAdd,
	BiCart,
	BiMinus,
	BiTrash,
} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
	cartSeletor,
	removeItem,
	updateQuantity,
} from '../redux/reducers/cartReducer';

const HeaderComponent = () => {
	const carts = useSelector(cartSeletor);
	const dispatch = useDispatch();

	return (
		<div
			style={{
				padding: '10px 40px',
			}}>
			<div className='row p-2'>
				<div className='col'></div>
				<div className='col text-end'>
					<Dropdown
						dropdownRender={() => (
							<Card style={{ minWidth: 320 }}>
								<List
									itemLayout='vertical'
									dataSource={carts}
									renderItem={(item) => (
										<List.Item
											key={item._id}
											extra={
												<Button
													icon={
														<BiTrash
															size={22}
															className='text-danger'
															type='text'
														/>
													}
													danger
													onClick={() => dispatch(removeItem({ id: item._id }))}
												/>
											}>
											<List.Item.Meta
												title={item.title}
												description={`Price: ${item.price.toLocaleString()} - Qty: ${
													item.quantity
												}`}
											/>
											<Space>
												<Button
													icon={<BiMinus size={18} />}
													onClick={() =>
														dispatch(
															updateQuantity({
																id: item._id,
																num: -1,
															})
														)
													}
												/>
												{item.quantity}
												<Button
													icon={<BiBookAdd size={18} />}
													onClick={() =>
														dispatch(
															updateQuantity({
																id: item._id,
																num: 1,
															})
														)
													}
												/>
											</Space>
										</List.Item>
									)}
								/>
								<h4>
									Total:{' '}
									{carts
										.reduce((a, b) => a + b.price * b.quantity, 0)
										.toLocaleString()}
								</h4>
							</Card>
						)}>
						<Badge count={carts.length}>
							<BiCart size={24} />
						</Badge>
					</Dropdown>
				</div>
			</div>
		</div>
	);
};

export default HeaderComponent;
