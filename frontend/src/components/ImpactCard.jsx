import React from 'react';
import { Users, Globe2, Sparkles, ArrowRight } from 'lucide-react';

export default function ImpactCard({ characterChanges, worldChanges }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Character Impacts */}
      <div>
        <div className="section-header">
          <h2 className="section-title font-display">
            <Users size={22} color="var(--quantum-cyan)" />
            Character Fate Recalibrations
          </h2>
        </div>

        <div className="impact-grid">
          {characterChanges && characterChanges.map((char, index) => (
            <div key={char.characterId || index} className="impact-card glass-panel">
              <div className="impact-char-header">
                <div>
                  <h3 className="impact-char-name">{char.name}</h3>
                  <span className="impact-char-role">{char.role}</span>
                </div>
                <span className="impact-fate-badge font-scifi">
                  {char.fateShift}
                </span>
              </div>

              <div className="impact-comparison">
                <div className="impact-row">
                  <span className="impact-label-sm">CANON PRIME DESTINY:</span>
                  <div className="impact-text-canon">{char.canonicalStatus}</div>
                </div>
                <div className="impact-row">
                  <span className="impact-label-sm" style={{ color: '#fda4af' }}>SIMULATED BRANCH REALITY:</span>
                  <div className="impact-text-sim">{char.simulatedStatus}</div>
                </div>
              </div>

              <p className="impact-detail-p">{char.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* World Impacts */}
      {worldChanges && worldChanges.length > 0 && (
        <div>
          <div className="section-header">
            <h2 className="section-title font-display">
              <Globe2 size={22} color="var(--tva-gold)" />
              Geopolitical & Cosmic Repercussions
            </h2>
          </div>

          <div className="impact-grid">
            {worldChanges.map((world, index) => (
              <div key={index} className="impact-card glass-panel" style={{ borderLeft: '4px solid var(--tva-gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 className="font-scifi" style={{ fontSize: '0.95rem', color: '#ffffff' }}>
                    {world.domain}
                  </h4>
                  <span style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-scifi)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#fbbf24'
                  }}>
                    {world.severity}
                  </span>
                </div>
                <div style={{ color: 'var(--quantum-cyan)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '8px' }} className="font-scifi">
                  {world.impact}
                </div>
                <p className="impact-detail-p">{world.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
