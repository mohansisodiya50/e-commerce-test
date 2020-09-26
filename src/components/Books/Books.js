import React from 'react';
import { withRouter } from 'react-router-dom';
import { BooksConsumer } from '../../context/Books-context';
import Book from './Book';

function Books() {
	return (
		<React.Fragment>
			<div className="container">
				<div className="heading">Books/Search books</div>
				<div className="row">
					<BooksConsumer>
						{(value) => {
							return value.books.length
								? value.books.map((book) => <Book key={book.id} book={book} />)
								: null;
						}}
					</BooksConsumer>
				</div>
			</div>
			);
		</React.Fragment>
	);
}

export default withRouter(Books);
