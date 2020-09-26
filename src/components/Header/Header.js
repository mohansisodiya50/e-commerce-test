import { Link, withRouter } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { BooksContext } from '../../context/Books-context';

import './Header.scss';
import firebase from '../../firebase';

import bookIcon from '../../book.png';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

const Header = (props) => {
	const classes = useStyles();
	const { cart, clearCart } = useContext(BooksContext);

	const [ name, setName ] = useState('');

	const userName = firebase.getCurrentUsername();

	useEffect(
		() => {
			setName(userName);
			firebase.isAuthenticated() && firebase.addToCart(cart);
		},
		[ cart, userName ]
	);

	const logout = async () => {
		await clearCart();
		await firebase.logout();
		setName('');
		props.history.push('/');
	};

	// async function login() {
	// 	try {
	// 		await firebase.login(email, password);
	// 		props.history.replace('/dashboard');
	// 	} catch (error) {
	// 		alert(error.message);
	// 	}
	// }

	return (
		<div className={`${classes.root} header`}>
			<AppBar position="static">
				<Toolbar>
					<Link to="/">
						<img src={bookIcon} alt="Book Icon" />
					</Link>
					<Link to="/" className={classes.title} variant="h6">
						<Button color="inherit">Books</Button>
					</Link>
					<Link to="/cart">
						<Button color="inherit">My Cart {cart.length}</Button>
					</Link>
					<div>Hello {name}</div>
					{firebase.isAuthenticated() ? (
						<button onClick={logout}>Logout</button>
					) : (
						<button onClick={() => props.history.push('/auth')}>Signin</button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withRouter(Header);
