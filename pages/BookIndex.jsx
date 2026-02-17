const { useState, useEffect } = React

import { bookService } from '../services/bookService.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from './BookDetails.jsx'

export function BookIndex(){
    
    const [ books, setBooks ] = useState(null)
    const [ selectedBook, setSelectedBook ] = useState(null)
    const [ filterBy, setFilterBy ] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        return bookService.query(filterBy)
            .then(setBooks)
    }

    function removeBook(bookId) {
        return bookService.remove(bookId)
            .then(() => setBooks(prev => prev.filter(book => book.id !== bookId)))
    }

    if (!books) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="" />
    </div>

     return <div className="book-index">
        {!selectedBook && 
            <React.Fragment>
                <BookFilter 
                    filterBy={filterBy} 
                    setFilterBy={setFilterBy}/>

                <BookList 
                    books={books} 
                    onSelectBook={setSelectedBook}
                    onRemoveBook={removeBook}/>
            </React.Fragment>}

        {selectedBook && 
            <BookDetails
                book={selectedBook}
                onClearSelectedBook={() => setSelectedBook(null)}/>}
    </div>
}