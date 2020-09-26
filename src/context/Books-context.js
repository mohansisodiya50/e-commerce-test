import React, { useState, useEffect } from 'react';
import axios from 'axios';

import firebase from '../firebase';

export const BooksContext = React.createContext();

function BooksProvider(props) {
	const [ books, setBooks ] = useState([]);
	const [ cart, setCart ] = useState([]);
	const [ selectedBook, setSelectedBook ] = useState('');

	useEffect(() => {
		axios.get('https://www.googleapis.com/books/v1/volumes?q={javascript}').then((res) => {
			const movies = [];

			res.data.items.map((movie) => {
				movies.push({
					id: movie.id,
					price: movie.saleInfo.listPrice ? movie.saleInfo.listPrice.amount : '',
					img: movie.volumeInfo.imageLinks ? movie.volumeInfo.imageLinks.thumbnail : '',
					title: movie.volumeInfo.title,
					authors:
						movie.volumeInfo.authors && movie.volumeInfo.authors.length ? movie.volumeInfo.authors[0] : '',
					description: movie.volumeInfo.description ? movie.volumeInfo.description : ''
				});
			});
			setBooks(movies);
		});

		firebase.isAuthenticated() && getCartData();
	}, []);

	const getCartData = async () => {
		try {
			const data = await firebase.getCartData();

			data.length && setCart(data);
		} catch (error) {
			console.log(error);
		}
	};

	const addToCart = (book) => {
		if (cart.some((e) => e.id === book.id)) {
			return alert('Already in Cart!');
		}

		setCart([ ...cart, book ]);
	};

	const clearCart = () => {
		setCart([]);
		firebase.clearCart();
	};

	const selectBook = (book) => {
		setSelectedBook(book);
	};

	return (
		<BooksContext.Provider
			value={{
				cart,
				books,
				selectedBook,
				addToCart: addToCart,
				selectBook: selectBook,
				clearCart: clearCart
			}}
		>
			{props.children}
		</BooksContext.Provider>
	);
}

const BooksConsumer = BooksContext.Consumer;

export { BooksProvider, BooksConsumer };
