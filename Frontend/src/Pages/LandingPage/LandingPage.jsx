import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <section className="hero-page">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">DESIGNED FOR DOERS</span>
            <h1>Learn faster, teach better, and grow together.</h1>
            <p>
              Skill Swap connects curious learners with real mentors. Explore verified skill profiles, book a conversation,
              and build your career with a modern community-first platform.
            </p>
            <div className="hero-actions">
              <button className="cta-button" onClick={() => navigate("/login")}>Start Learning</button>
              <button className="ghost-button" onClick={() => navigate("/register")}>Create Account</button>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/assets/images/1.png" alt="Skill Swap illustration" />
          </div>
        </div>
      </section>

      <section className="feature-cards">
        <article className="feature-card">
          <h3>Find Trusted Mentors</h3>
          <p>Discover skill experts with verified profiles and reviews to help you get results quickly.</p>
        </article>
        <article className="feature-card">
          <h3>Share What You Know</h3>
          <p>Teach others, earn reputation, and build a portfolio of successful collaborations.</p>
        </article>
        <article className="feature-card">
          <h3>Learn at Your Pace</h3>
          <p>Choose sessions, practice projects, and swap knowledge in a supportive learning community.</p>
        </article>
      </section>
    </div>
  );
};

export default LandingPage;
