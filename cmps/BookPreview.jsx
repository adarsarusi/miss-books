export function BookPreview({ book }) {
    return <article className="book-preview">
        <h2>{book.title}</h2>
        <p>{book.listPrice}</p>
        <img 
            src={`./assets/img/${book.title}.jpg`} 
            alt="" />
    </article>
}