import { useEffect, useState } from 'react'

const API_URL = 'https://dragonball-api.com/api/characters?page=1&limit=12'

function Home() {
  const [personajes, setPersonajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Error al consultar la API')
        return res.json()
      })
      .then((data) => {
        // La API devuelve { items: [...], meta: {...} }
        const lista = data.items ?? data
        // Solo los que tienen imagen
        setPersonajes(lista.filter((p) => p.image))
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  return (
    <section className="list-section">
      <p className="eyebrow">Sitio web · React</p>
      <h1 className="section-title">Inicio</h1>
      <p className="page-lead">
        <strong>Personajes de Dragon Ball - Dragon Ball API</strong>
      </p>

      {cargando && <p>Cargando...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="cards">
        {personajes.map((p) => (
          <article className="card" key={p.id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="meta">Raza: {p.race || 'Sin datos'}</p>
            <p className="meta">Afiliación: {p.affiliation || 'Sin datos'}</p>
            <p className="meta">Ki: {p.ki || 'Sin datos'}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Home