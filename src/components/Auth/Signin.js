import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';

const Signin = (props) => {
	const [ email, setEmail ] = useState('');
	const [ error, setError ] = useState('');
	const [ password, setPassword ] = useState('');

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await firebase.login(email, password);

			props.history.replace('/checkout');
		} catch (error) {
			setError(error);
		}
	};

	const loginForm = (
		<form onSubmit={submitHandler}>
			<div className="form-container">
				{error ? <h3>{error.message}</h3> : null}
				<label htmlFor="email">
					<b>Email</b>
				</label>
				<input
					type="text"
					placeholder="Enter Email"
					name="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label htmlFor="psw">
					<b>Password</b>
				</label>
				<input
					type="password"
					placeholder="Enter Password"
					name="psw"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit">Login</button>
				<button onClick={props.handleNewUser}> New User ?</button>
			</div>
		</form>
	);

	return <div className="signin">{loginForm}</div>;
};

export default withRouter(Signin);
