import servicios from '../data/servicios'

function Services() {
  return (
    <section className="list-section">
      <p className="eyebrow">Lo que ofrecemos</p>
      <h1 className="section-title">Servicios</h1>
      <p className="page-lead">Tecnologías y habilidades de tecnología de la información.</p>

      <div className="cards">
        {servicios.map((s) => (
          <article className="card" key={s.id}>
            <img src={s.imagen} alt={s.nombre} />
            <h3>{s.nombre}</h3>
            <span className="tag">{s.categoria}</span>
            <p>{s.descripcion}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services