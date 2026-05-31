import { useState, useEffect } from 'react'
import './PlanetCard.css'

const API_URL =
  'https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,eq,true&filter[]=bodyType,eq,Planet&data=englishName,semimajorAxis,bodyType'

const PLANET_IMAGES = {
  Mercury: 'https://amurella.github.io/images/mercury.webp',
  Venus:   'https://amurella.github.io/images/venus.webp',
  Earth:   'https://amurella.github.io/images/earth.webp',
  Mars:    'https://amurella.github.io/images/mars.webp',
  Jupiter: 'https://amurella.github.io/images/jupiter.webp',
  Saturn:  'https://amurella.github.io/images/saturn.webp',
  Uranus:  'https://amurella.github.io/images/uranus.webp',
  Neptune: 'https://amurella.github.io/images/neptune.webp',
}

const AU_MAP = {
  Mercury: 0.39,  Venus: 0.72,  Earth: 1.00,  Mars: 1.52,
  Jupiter: 5.20,  Saturn: 9.58, Uranus: 19.2, Neptune: 30.05,
}

function PlanetCard({ planet }) {
  return (
    <article className="planet-card">
      <figure className="planet-figure">
        <img
          src={planet.image}
          alt={`Surface view representing ${planet.planet}`}
          width="300"
          height="190"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${planet.planet}/300/190`
          }}
        />
      </figure>
      <div className="planet-info">
        <span className="planet-name">{planet.planet}</span>
        <span className="planet-dist">{planet.distanceFromSun} AU from the Sun</span>
      </div>
    </article>
  )
}

export default function PlanetsSection() {
  const [planets, setPlanets]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error,   setError]     = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const shaped = (data.bodies || data)
          .filter((b) => b.bodyType === 'Planet' || b.isPlanet)
          .map((b) => ({
            planet:          b.englishName,
            distanceFromSun: AU_MAP[b.englishName]
                               ?? (b.semimajorAxis / 1.496e8).toFixed(2),
            image:           PLANET_IMAGES[b.englishName]
                               ?? `https://picsum.photos/seed/${b.englishName}/300/190`,
          }))
        setPlanets(shaped)
        setLoading(false)
      })
      .catch(() => {
        setPlanets([
          { planet: 'Mercury', distanceFromSun: 0.39,  image: PLANET_IMAGES.Mercury },
          { planet: 'Venus',   distanceFromSun: 0.72,  image: PLANET_IMAGES.Venus   },
          { planet: 'Earth',   distanceFromSun: 1.00,  image: PLANET_IMAGES.Earth   },
          { planet: 'Mars',    distanceFromSun: 1.52,  image: PLANET_IMAGES.Mars    },
          { planet: 'Jupiter', distanceFromSun: 5.20,  image: PLANET_IMAGES.Jupiter },
          { planet: 'Saturn',  distanceFromSun: 9.58,  image: PLANET_IMAGES.Saturn  },
          { planet: 'Uranus',  distanceFromSun: 19.2,  image: PLANET_IMAGES.Uranus  },
          { planet: 'Neptune', distanceFromSun: 30.05, image: PLANET_IMAGES.Neptune },
        ])
        setLoading(false)
        setError('Using offline data — check your API endpoint.')
      })
  }, [])

  return (
    <section className="planets-section" id="planets-section">
      <div className="planets-container">

        {/* ── Section header ── */}
        <div className="section-header">
          <h2 className="section-title">
            Visualizing the Differences Between Planets
          </h2>
          <p className="section-desc">
            Each planet in our solar system has unique physical characteristics.
            Visual comparisons help highlight how vastly different terrestrial
            planets are from gas giants and ice giants.
          </p>
        </div>

        {/* ── Error banner ── */}
        {error && (
          <p className="planets-error" role="alert">{error}</p>
        )}

        {/* ── Loading / Grid ── */}
        {loading ? (
          <div className="planets-loading" aria-live="polite">
            <span className="loader" />
            <p>Fetching planets…</p>
          </div>
        ) : (
          <div className="planets-grid">
            {planets.map((p) => (
              <PlanetCard key={p.planet} planet={p} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}