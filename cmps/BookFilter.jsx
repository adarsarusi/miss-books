const { useState, useEffect } = React

export function BookFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    const categories = ['All', 'Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

    function handleChange(ev) {
        const { type, value, name } = ev.target

        setFilterByToEdit(prev => (
            { ...prev, [name]: type === 'text' ? value : +value }))
    }

    function toggleIsActive(category) {
        setFilterByToEdit(prev => ({
            ...prev,
            category
        }))
    }

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])



    return <section className="book-filter">
        <p>Search:</p>
        <input
            value={filterByToEdit.txt}
            onChange={ev => handleChange(ev)}
            type="text"
            name="txt"
            placeholder="Title" />

        <input
            value={filterByToEdit.minPrice || ''}
            onChange={ev => handleChange(ev)}
            type="number"
            name="minPrice"
            placeholder="Min. Price" />

        <input
            value={filterByToEdit.pageCount || ''}
            onChange={ev => handleChange(ev)}
            type="number"
            name="pageCount"
            placeholder="Min. Page Count" />

        <input
            value={filterByToEdit.author}
            onChange={ev => handleChange(ev)}
            type="text"
            name="author"
            placeholder="Author" />

        <input
            value={filterByToEdit.minPublishDate || ''}
            onChange={ev => handleChange(ev)}
            type="number"
            name="minPublishDate"
            placeholder="Min. Publish Date" />




        <section className="btn-group">
            {categories.map(category => (
                <button
                    key={category}
                    className={filterByToEdit.category === category ? 'active' : ''}
                    onClick={() => toggleIsActive(category)}
                >
                    {category}
                </button>
            ))}
        </section>




    </section>
}