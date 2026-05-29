
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      {/* Logo */}
      <div className="hero-logo">
        <img
          src="/logo.svg"
          alt=""
          className="logo-image"
        />
      </div>

      {/* Hero Content */}
      <div className="hero-content">

        <h1>
          Explore Our Solar
          <br />
          System Through Data
        </h1>

        <p>
          Understand the planets not just by names,
          but by measurable facts. From size and mass
          to gravity and density, this page breaks down
          the solar system in a clear, data-driven way.
        </p>

        <div className="hero-buttons">

          <button
            type="button"
            className="primary-btn"
          >
            Explore the Data
          </button>

          <button
            type="button"
            className="secondary-btn"
          >
            Contact Us
          </button>

        </div>
      </div>

      {/* Planet Globe */}
      <div className="hero-image">
        <img
          src="/earth.png"
          alt="Planet Earth"
          className="earth-image"
        />
      </div>

    </section>
  );
}

