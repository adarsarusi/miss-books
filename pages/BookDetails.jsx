const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bookService } from '../services/bookService.js'

import { LongTxt } from '../cmps/LongTxt.jsx'
import { BookReviews } from '../cmps/BookReviews.jsx'

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()

    useEffect(() => {
        bookService.get(params.id)
            .then(setBook)
    }, [params.id])

    if (!book) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="A loader." />
    </div>

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

    function priceClassList() {
        const classList = ['']

        if (book.listPrice.amount > 150) classList.push('expensive')
        if (book.listPrice.amount < 20) classList.push('cheap')

        return classList.join(' ')
    }


    return <article className="book-details">
        <Link to="/book"><button>Back</button></Link>
        <Link to={`/book/edit/${book.id}`}>
            <button className="btn-edit">Edit</button>
        </Link>
        <Link to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
        <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
        <h1>{book.title}</h1>
        <h3>{book.subtitle}</h3>
        <h4><span className="book-detail">Authors:</span> {book.authors}</h4>
        <h4><span className="book-detail">Published Date:</span> {book.publishedDate} <span className="book-comment">{condition}</span></h4>
        <h4><span className="book-detail">Categories:</span> {book.categories}</h4>
        <h4><span className="book-detail">Language:</span> {book.language}</h4>
        <h4><span className="book-detail">Pages:</span> {book.pageCount} <span className="book-comment">{reading}</span></h4>
        <h4><span className="book-detail">Price:</span> <span className={priceClassList()}>{book.listPrice.amount}</span> {book.listPrice.currencyCode} <span className="book-sale">{sale}</span></h4>
        <LongTxt txt={book.description} />
        <img src={book.thumbnail} alt="" />
        <BookReviews book={book}/>
    </article>
}