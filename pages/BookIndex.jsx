const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/bookService.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { UserMsg } from '../cmps/UserMsg.jsx'
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { BookDetails } from './BookDetails.jsx'
import { BookEdit } from './BookEdit.jsx'

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        return bookService.query(filterBy)
            .then(setBooks)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prev => prev.filter(book => book.id !== bookId))
                showSuccessMsg(`book ${bookId} removed`)
            })
            .catch(err => showErrorMsg(`Couldn't remove ${bookId}`))
    }

    if (!books) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="" />
    </div>

     return <div className="book-index">
        <React.Fragment>
            <BookFilter 
                filterBy={filterBy} 
                setFilterBy={setFilterBy} />

            <Link to="/book/edit"><div className="features"><button className="add-btn">Add a Book</button></div></Link>

            <BookList 
                books={books} 
                onRemoveBook={onRemoveBook}/>
        </React.Fragment>
    </div>
}

// return <div className="book-index">
//         {!selectedBook &&
//             <React.Fragment>
//                 <BookFilter
//                     filterBy={filterBy}
//                     setFilterBy={setFilterBy} />

//                 <BookList
//                     books={books}
//                     onSelectBook={setSelectedBook}
//                     onRemoveBook={removeBook} />
//             </React.Fragment>}

//         {selectedBook && (
//             <section>
//                 {!isEdit && (
//                     <BookDetails
//                         book={selectedBook}
//                         onClearSelectedBook={() => setSelectedBook(null)}
//                         onEdit={() => setIsEdit(true)}
//                     />
//                 )}

//                 {isEdit && (
//                     <BookEdit
//                         book={selectedBook}
//                         onUpdate={onUpdateBook}
//                         onCancelEdit={() => setIsEdit(false)}
//                     />
//                 )}
//             </section>
//         )}
//     </div>