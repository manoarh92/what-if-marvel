import React from 'react';
import {
  Sparkles,
  Zap,
  Clock,
  AlertOctagon,
  Award,
  ChevronRight,
  Shield,
  Heart,
  Users,
  Compass
} from 'lucide-react';

export default function CinematicStoryView({ narrative, timeline }) {
  if (!narrative) return null;

  const {
    episodeTitle,
    tagline,
    theDivergence,
    theMoment,
    rippleEffects,
    yearsLater,
    theTwist,
    alternateEnding
  } = narrative;

  return (
    <div className="cinematic-story-wrapper">
      {/* Episode Header */}
      <div className="story-hero-section">
        <div className="story-episode-tag">
          <Sparkles size={16} />
          <span>ALTERNATE TIMELINE EXPLORATION</span>
        </div>
        <h1 className="story-main-title font-display">
          {episodeTitle || "WHAT IF... DESTINY CHANGED?"}
        </h1>
        <p className="story-tagline">
          {tagline || "One single choice. An entirely different reality."}
        </p>
      </div>

      {/* 1. THE DIVERGENCE & THE MOMENT */}
      <section className="story-scene-card glass-panel divergence-card">
        <div className="scene-badge-row">
          <span className="story-pill gold">
            <Zap size={14} />
            {theDivergence?.title || "WHAT CHANGED?"}
          </span>
          <span className="story-pill red">THE DIVERGENCE</span>
        </div>

        <h2 className="scene-headline font-display">
          {theDivergence?.headline || "THE MOMENT THAT CHANGED EVERYTHING"}
        </h2>

        <div className="scene-lines">
          {theDivergence?.lines?.map((line, idx) => (
            <p key={idx} className={`scene-p ${line === line.toUpperCase() && line.length > 5 ? 'highlight-loud' : ''}`}>
              {line}
            </p>
          ))}
        </div>

        {theMoment && (
          <div className="moment-action-banner">
            <div className="moment-action-title font-scifi">
              {theMoment.action}
            </div>
            <div className="moment-lines">
              {theMoment.lines?.map((line, idx) => (
                <p key={idx} className="moment-p">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. THE RIPPLE EFFECT */}
      <section className="story-section">
        <div className="story-section-title-bar">
          <h3 className="story-section-title font-display">
            THE RIPPLE EFFECT
          </h3>
          <p className="story-section-subtitle">
            How key fates shifted across this reality
          </p>
        </div>

        <div className="ripple-cards-grid">
          {rippleEffects && rippleEffects.map((item, idx) => (
            <div key={idx} className="ripple-fan-card glass-panel">
              <div className="ripple-card-header">
                <h4 className="ripple-character-name font-scifi">{item.character}</h4>
                <span className="ripple-highlight-badge font-scifi">
                  {item.highlight}
                </span>
              </div>

              <div className="ripple-comparison-block">
                <div className="ripple-comp-row">
                  <span className="ripple-comp-label">ORIGINAL:</span>
                  <span className="ripple-comp-val original">{item.original}</span>
                </div>
                <div className="ripple-comp-row">
                  <span className="ripple-comp-label alt">THIS UNIVERSE:</span>
                  <span className="ripple-comp-val alt">{item.thisUniverse}</span>
                </div>
              </div>

              {item.summary && (
                <p className="ripple-summary-text">{item.summary}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. YEARS LATER */}
      {yearsLater && (
        <section className="story-scene-card glass-panel years-later-card">
          <div className="scene-badge-row">
            <span className="story-pill cyan">
              <Clock size={14} />
              {yearsLater.badge || "5 YEARS LATER"}
            </span>
          </div>

          <h3 className="scene-headline font-display">
            {yearsLater.headline}
          </h3>

          <div className="scene-lines spaced">
            {yearsLater.lines?.map((line, idx) => (
              <p key={idx} className="scene-p large">
                {line}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* 4. THE TWIST */}
      {theTwist && (
        <section className="story-twist-card">
          <div className="twist-badge-wrapper">
            <span className="twist-badge font-scifi">
              <AlertOctagon size={16} />
              {theTwist.badge || "BUT THEN..."}
            </span>
          </div>

          <h3 className="twist-warning-title font-display">
            {theTwist.warning}
          </h3>

          <div className="twist-subtext font-scifi">
            {theTwist.subtext}
          </div>

          <div className="twist-lines">
            {theTwist.lines?.map((line, idx) => (
              <p key={idx} className="twist-p">
                {line}
              </p>
            ))}
          </div>
        </section>
      )}
      

      {/* 5. ALTERNATE ENDING */}
      {alternateEnding && (
        <section className="story-scene-card glass-panel ending-card">
          <div className="scene-badge-row">
            <span className="story-pill purple">
              <Award size={14} />
              {alternateEnding.title || "ALTERNATE ENDING"}
            </span>
          </div>

          <div className="scene-lines spaced">
            {alternateEnding.lines?.map((line, idx) => (
              <p key={idx} className="scene-p large ending">
                {line}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
