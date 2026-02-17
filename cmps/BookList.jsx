import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook, onSelectBook }) {
	return <section className="book-list">
        <ul className="fluid-grid">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} />
                    <div className="actions">
                        <button 
                            onClick={() => onSelectBook(book)}
                            className="btn-details">Details</button>

                        <button 
                            onClick={() => onRemoveBook(book.id)}
                            className="btn-remove">x</button>
                    </div>
                </li>
            ))}
        </ul>
    </section>
}
