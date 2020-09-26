import React, { useContext } from 'react';
import { BooksContext } from '../../context/Books-context';
import { Link } from 'react-router-dom';
import './Cart.scss';
import firebase from '../../firebase';

export default function Cart() {
	const { cart } = useContext(BooksContext);

	const redirectTo = firebase.isAuthenticated() ? '/checkout' : '/auth';

	return (
		<div className="cart">
			{cart.length ? (
				<Link to={redirectTo}>
					<button className="success">Checkout</button>
				</Link>
			) : (
				<h1>Your Cart is Empty!</h1>
			)}

			{cart.length ? (
				cart.map((book) => {
					console.log(book);
					return (
						<div className="cart-item" key={book.id}>
							<div className="item-info-wrap">
								<div className="item-img">
									<img src={book.img} alt="book" />
								</div>
								<div className="item-info">
									<h2 key={book.id}>{book.title}</h2>
									<p>{book.authors}</p>
									<h2>Price: {book.price}</h2>
								</div>
							</div>
						</div>
					);
				})
			) : null}
		</div>
	);
}
