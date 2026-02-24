const { Link } = ReactRouterDOM

import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
    return <section className="book-list">
        <ul className="fluid-grid">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} />
                    <div className="actions">
                        <Link to={`/book/${book.id}`}>
                            <button className="btn-details">Details</button>
                        </Link>

                        <button
                            onClick={() => onRemoveBook(book.id)}
                            className="btn-remove">x</button>
                    </div>
                </li>
            ))}
        </ul>
    </section>
}
