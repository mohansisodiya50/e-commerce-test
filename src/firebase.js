import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBY9xgsTdcxxg0CDzrFgUfwp715FoBKJso',
	authDomain: 'ebooks-test-7f174.firebaseapp.com',
	databaseURL: 'https://ebooks-test-7f174.firebaseio.com',
	projectId: 'ebooks-test-7f174',
	storageBucket: 'ebooks-test-7f174.appspot.com',
	messagingSenderId: '1063962317859',
	appId: '1:1063962317859:web:e0d07af8eb88861671cd96',
	measurementId: 'G-8YH0RY15H7'
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		this.db = app.firestore();
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		return this.auth.signOut();
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password);
		return this.auth.currentUser.updateProfile({
			displayName: name
		});
	}

	isInitialized() {
		return new Promise((resolve) => {
			this.auth.onAuthStateChanged(resolve);
		});
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName;
	}

	isAuthenticated() {
		return this.auth.currentUser !== null;
	}

	addToCart(data) {
		if (this.auth.currentUser == null) {
			return alert('Not authorized');
		}

		if (!data.length) return;

		console.log('data ', data);

		const mm =
			data.length &&
			data.map((obj) => {
				return Object.assign({}, obj);
			});
		console.log('mm ', mm);
		return (
			Object.keys(mm).length &&
			this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({ cartData: data })
		);
	}

	async getCartData() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get();
		return quote.get('cartData');
	}

	async clearCart() {
		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({ cartData: [] });
	}
}

export default new Firebase();
