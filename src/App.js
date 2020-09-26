import React, { useState, useEffect } from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Routes from './routes';

import firebase from './firebase';

import { BooksProvider } from './context/Books-context';

function App() {
	const [ firebaseInitialized, setFirebaseInitialized ] = useState(false);

	useEffect(() => {
		firebase.isInitialized().then((val) => {
			setFirebaseInitialized(val);
		});
	});

	return firebaseInitialized !== false ? (
		<BooksProvider>
			<BrowserRouter>
				<Header />
				<div className="main-content" />
				<Routes />
			</BrowserRouter>
		</BooksProvider>
	) : (
		<div className="loader">Loading...</div>
	);
}

export default App;
