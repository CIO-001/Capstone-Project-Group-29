// components/VideoSection.jsx

import "./VideoSection.css";

function VideoSection() {
  return (
    <section className="video-section">
      <div className="video-box">
        <video autoPlay muted loop controls>
          <source
            src="https://videos.pexels.com/video-files/857195/857195-hd_1280_720_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="video-content">
        <h2>How Planetary Data Helps Us Understand Space</h2>

        <p>
          Planetary science goes beyond images. Comparing mass,
          diameter, gravity, and density, we gain insight into how
          planets form, behave, and interact within the solar system.
        </p>
      </div>
    </section>
  );
}

export default VideoSection;