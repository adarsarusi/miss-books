const { useEffect, useState } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/bookService.js'
import { eventBus, showSuccessMsg } from '../services/event-bus.service.js'

import { LongTxt } from '../cmps/LongTxt.jsx'

export function BookEdit() {

    const [ book, setBook ] = useState(bookService.getEmptyBook())
    const [ msg, setMsg ] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.id) {
            bookService.get(params.id)
                .then(setBook)
        }
    }, [])

    function handleChange({ target }) {
        let { value, name: field } = target

        switch (field) {
            case 'title':
                value = target.value || bookToEdit.title
                break
            case 'price':
                value = +target.value || bookToEdit.listPrice.amount
                break
        }

        if (field === 'price') {
            setBook(prevBook => ({ ...prevBook, listPrice: { ...book.listPrice, amount: value } }))
        } else {
            setBook(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(book)
            .then(savedBook => {
                showSuccessMsg(`book ${savedBook.id} saved`)
                navigate('/book')
            })
    }

    let reading = ''
    if (book.pageCount > 500) reading = 'Serious Reading'
    else if (book.pageCount > 200) reading = 'Descent Reading'
    else if (book.pageCount < 100) reading = 'Light Reading'

    const d = new Date();
    let year = d.getFullYear()
    let condition = ''
    if (year - book.publishedDate > 10) condition = 'Vintage!'
    else if (year - book.publishedDate <= 1) condition = 'New!'

    let sale = ''
    if (book.listPrice.isOnSale) sale = 'On Sale!'


    return <article className="book-edit">

        <form onSubmit={onSaveBook}>

            <h1>Title: <input
                type="text"
                placeholder="Enter New Title"
                name="title"
                value={book.title}
                onChange={handleChange} /></h1>
            <h3>{book.subtitle}</h3>
            <h4><span className="book-detail">Authors:</span> {book.authors}</h4>
            <h4><span className="book-detail">Published Date:</span> {book.publishedDate} <span className="book-comment">{condition}</span></h4>
            <h4><span className="book-detail">Categories:</span> {book.categories}</h4>
            <h4><span className="book-detail">Language:</span> {book.language}</h4>
            <h4><span className="book-detail">Pages:</span> {book.pageCount} <span className="book-comment">{reading}</span></h4>
            <h4><span className="book-detail">Price:</span>
                <span>
                    <input
                        type="text"
                        placeholder="Set Price"
                        name="price"
                        value={book.listPrice.amount}
                        onChange={handleChange} />
                </span>
            </h4>
            <div className="book-edit-actions-container">
                <button className="save-edit-btn" onClick={onSaveBook}>
                    Save
                </button>
                <Link to="/book"><button>Cancel</button></Link>
                
            </div>
            <LongTxt txt={book.description} />
            <img src={book.thumbnail} alt="" />
        </form>
    </article>

}