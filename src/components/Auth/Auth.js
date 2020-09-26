import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

import './Auth.scss';

export default function Auth() {
	const [ newUser, setNewUser ] = useState(false);

	return <div className="auth">{newUser ? <Signup /> : <Signin handleNewUser={() => setNewUser(true)} />}</div>;
}
