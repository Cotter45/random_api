import { useNavigate } from "react-router-dom";


function FourOhFour() {
  const navigate = useNavigate();

  return (
    <main className='main_container'>
      <section className='section'>
        <section className='list_column'>
          <h2>This page doesn't exist yet!</h2>
          <button type='button' className='link' onClick={() => navigate('/')}>Phone Home</button>
        </section>
      </section>

    </main>
  )
}

export default FourOhFour;