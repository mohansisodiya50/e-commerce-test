import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';

const Signup = (props) => {
	const [ email, setEmail ] = useState('');
	const [ error, setError ] = useState('');
	const [ name, setName ] = useState('');
	const [ password, setPassword ] = useState('');

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await firebase.register(name, email, password);

			props.history.replace('/checkout');
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div>
			<form onSubmit={submitHandler}>
				<div className="form-container">
					{error ? <h3>{error.message}</h3> : null}
					<label htmlFor="name">
						<b>Name</b>
					</label>
					<input
						type="text"
						placeholder="Enter Name"
						name="name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

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

					<button type="submit">Signup</button>
				</div>
			</form>
		</div>
	);
};

export default withRouter(Signup);
