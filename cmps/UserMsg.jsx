export function UserMsg({ msg }) {
    if (!msg) return <span></span>

    return <section className='user-msg success'>
        {msg}
    </section>
  }
  