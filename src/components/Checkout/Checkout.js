import React, { useState, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { BooksContext } from '../../context/Books-context';
import './Checkout.scss';

function Checkout(props) {
	const [ address, setAddress ] = useState('');
	const [ fullName, setFullName ] = useState('');
	const [ orderPlaced, setOrderPlaced ] = useState(false);
	const { clearCart, cart } = useContext(BooksContext);

	if (!cart.length && !orderPlaced) {
		return <Redirect to="/" />;
	}

	const handlePlaceOrder = (event) => {
		event.preventDefault();

		setOrderPlaced(true);

		clearCart();
	};

	const form = (
		<form className="checkout" onSubmit={handlePlaceOrder}>
			<div className="form-container">
				<label htmlFor="fullName">
					<b>Full Name</b>
				</label>
				<input
					type="text"
					placeholder="Enter Full Name"
					name="fullName"
					required
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>

				<label htmlFor="address">
					<b>Address</b>
				</label>
				<input
					type="text"
					placeholder="Enter Address"
					name="address"
					required
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>

				<label>
					<b>Payment Method</b>
				</label>
				<div className="payment">
					<input type="radio" name="payment" defaultChecked />
					<label htmlFor="payment">
						<b>COD</b>
					</label>
				</div>

				<button type="submit">Buy Now</button>
			</div>
		</form>
	);

	const renderForm = orderPlaced ? <h1 className="success">Order Placed Successfully!</h1> : form;

	return renderForm;
}

export default withRouter(Checkout);
