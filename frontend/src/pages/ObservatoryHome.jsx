import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, Zap, HelpCircle, ArrowRight, Shield } from 'lucide-react';
import { fetchPresets } from '../utils/api';

export default function ObservatoryHome({ onSimulate, isSimulating }) {
  const [question, setQuestion] = useState('What if Thor snapped in Endgame?');
  const [presets, setPresets] = useState([]);

  useEffect(() => {
    fetchPresets().then(data => {
      if (data && data.length > 0) {
        setPresets(data);
      } else {
        // Fallback default presets if offline
        setPresets([
          {
            id: 'scenario-thor-snap',
            question: 'What if Thor snapped in Endgame?',
            short_title: "Thor's Final Snap",
            featured: true
          },
          {
            id: 'scenario-steve-stays',
            question: 'What if Steve Rogers didn\'t return the Infinity Stones?',
            short_title: 'Unreturned Stones'
          },
          {
            id: 'scenario-tony-survives',
            question: 'What if Tony Stark survived the Battle of Earth?',
            short_title: 'Tony Stark Survives'
          }
        ]);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSimulate(question.trim());
  };

  const handleSelectPreset = (presetQuestion) => {
    setQuestion(presetQuestion);
    onSimulate(presetQuestion);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Hero Header */}
      <div className="hero-section">
        <div className="hero-tag">
          <Sparkles size={14} />
          <span>EARTH-616 CAUSALITY OBSERVATORY</span>
        </div>

        <h1 className="hero-heading">
          WHAT IF...?
        </h1>

        <p className="hero-subheading">
          Explore another reality. Enter any pivotal moment in Marvel history to shatter the Sacred Timeline and witness the ripple effects across the multiverse.
        </p>
      </div>

      {/* Multiverse Simulation Console */}
      <div className="simulation-console">
        <div className="input-header">
          <div className="input-label">
            <Compass size={16} />
            <span>NEXUS QUERY SPECIFICATION</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }} className="font-mono">
            STATUS: READY
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              className="query-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What if Thor snapped in Endgame?"
              disabled={isSimulating}
            />
          </div>

          <button
            type="submit"
            className="simulate-btn"
            disabled={isSimulating}
          >
            <Zap size={20} />
            <span>Simulate Timeline</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {/* Preset Scenario Quick Select */}
      <div className="preset-section">
        <div className="preset-header">
          <HelpCircle size={14} />
          <span>Curated Multiverse Nexus Scenarios</span>
        </div>

        <div className="preset-grid">
          {presets.map((p) => {
            const isFeatured = p.id === 'scenario-thor-snap' || p.featured;
            return (
              <button
                key={p.id}
                className={`preset-pill ${isFeatured ? 'featured' : ''}`}
                onClick={() => handleSelectPreset(p.question)}
                disabled={isSimulating}
              >
                {isFeatured && <Sparkles size={14} color="#f59e0b" />}
                <span>{p.short_title || p.question}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
