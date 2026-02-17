export function AppHeader({ page = 'home', onSetPage }) {

    return <header className="app-header full main-layout">
        <section className="header-container">
            <h1>Miss Books</h1>
            <nav>
                <a href="#" className={(page === 'home') ? 'active' : ''}
                    onClick={(ev) => onSetPage('home')}>
                    Home
                </a>
                <span> | </span>
                <a href="#" className={(page === 'about') ? 'active' : ''}
                    onClick={(ev) => onSetPage('about')}>
                    About
                </a>
                <span> | </span>
                <a href="#" className={(page === 'books') ? 'active' : ''}
                    onClick={(ev) => onSetPage('books')}>
                    Books
                </a>
            </nav>
        </section>
    </header>
}
