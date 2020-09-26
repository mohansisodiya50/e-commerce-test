import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BookDetails from './components/BookDetails/BookDetails';
import Books from './components/Books/Books';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Cart from './components/Cart/Cart';
import Auth from './components/Auth/Auth';
import Checkout from './components/Checkout/Checkout';

const Routes = () => (
	<Switch>
		<Route path="/" exact>
			<Books />
		</Route>
		<Route path="/details">
			<BookDetails />
		</Route>
		<Route path="/cart">
			<Cart />
		</Route>
		<Route path="/checkout">
			<Checkout />
		</Route>
		<Route path="/auth">
			<Auth />
		</Route>
		<Route>
			<PageNotFound />
		</Route>
	</Switch>
);

export default Routes;
