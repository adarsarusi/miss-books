const { useState } = React

import { bookService } from "../services/bookService"
import { UserMsg } from '../cmps/UserMsg.jsx'
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookReviews({ book }) {

    const [review, setReview] = useState({
        fullname: '',
        rating: '5',
        readAt: ''
    })

    function handleChange(ev) {
        const { name, value } = ev.target

        setReview(prevReview => ({
            ...prevReview,
            [name]: value
        }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()

        bookService.addReview(book.id, review)
            .then(() => {
                showSuccessMsg('Review added')
                setReview({
                    fullname: '',
                    rating: '5',
                    readAt: ''
                })
            })
    }


    return <section>
        <form className="review-form" onSubmit={onSaveReview}>

            <h3 className="review">
                <label htmlFor="fullName">Full Name: </label>
                <input type="text"
                    placeholder="Full Name"
                    id="fullName"
                    name="fullname"
                    value={review.fullname}
                    onChange={handleChange} />
            </h3>

            <h4 className="review">
                <label htmlFor="rating">Rating:</label>
                <select id="rating"
                    name="rating"
                    value={review.rating}
                    onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </h4>

            <h4 className="review">
                <label htmlFor="readAt">Read At:</label>
                <input type="date"
                    id="readAt"
                    name="readAt"
                    value={review.readAt}
                    onChange={handleChange} />
            </h4>
        <button>Add Review</button>

        </form>
    </section>
}