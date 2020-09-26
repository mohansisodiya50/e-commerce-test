import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { BooksContext } from '../../context/Books-context';
import './BookDetails.scss';

function BookDetails() {
	const { addToCart, selectedBook } = useContext(BooksContext);

	const addHandler = () => {
		addToCart(selectedBook);
	};

	return (
		<div className="book-details">
			{selectedBook ? (
				<div className="cart-item">
					<div className="item-info-wrap">
						<div className="item-img">
							<img src={selectedBook.img} alt="book" />
						</div>
						<div className="item-info">
							<h2>{selectedBook.title}</h2>
							<p>{selectedBook.authors}</p>
							<p>{selectedBook.description}</p>
							<h2>Price: {selectedBook.price}</h2>
						</div>
					</div>
					<button className="btn" onClick={addHandler}>
						Add To Cart
					</button>
				</div>
			) : (
				<h1>Please select a book </h1>
			)}
		</div>
	);
}

export default withRouter(BookDetails);
