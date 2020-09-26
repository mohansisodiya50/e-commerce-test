import React, { useContext } from 'react';
import './Book.scss';
import { Link } from 'react-router-dom';
import { BooksContext } from '../../context/Books-context';

export default function Book({ book }) {
	const { addToCart, selectBook } = useContext(BooksContext);

	const addHandler = () => {
		addToCart(book);
	};

	return (
		<div className="card">
			<div onClick={() => selectBook(book)}>
				<Link to="/details">
					<div className="card-header">
						<img src={book.img} alt="Book" />
					</div>
					<div className="card-body">
						<h3>{book.title}</h3>
						<p>By {book.authors}</p>
						<h4>Price: $10</h4>
					</div>
				</Link>
			</div>
			<button className="btn" onClick={addHandler}>
				Add To Cart
			</button>
		</div>
	);
}
