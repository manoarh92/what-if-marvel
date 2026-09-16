import React, { useState, useRef } from 'react';
import {
  RotateCcw,
  Compass,
  GitBranch,
  ChevronDown,
  ChevronUp,
  Shield,
  Activity,
  AlertTriangle,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import CinematicStoryView from '../components/CinematicStoryView';
import TimelineVisualizer from '../components/TimelineVisualizer';

export default function TimelineResult({ simulationData, onReset }) {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const timelineRef = useRef(null);

  if (!simulationData || !simulationData.timeline) return null;

  const { timeline, narrative, analysis } = simulationData;

  const handleExploreTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="result-container cinematic-result-container">
      {/* 1. CINEMATIC MARVEL STORY EXPERIENCE */}
      <CinematicStoryView narrative={narrative} timeline={timeline} />

      {/* Action Controls between Story & Timeline */}
      <div className="story-nav-actions">
        <button
          className="btn-primary-action"
          onClick={handleExploreTimeline}
        >
          <GitBranch size={18} />
          <span>Explore This Timeline</span>
        </button>

        <button
          className="btn-secondary-action"
          onClick={onReset}
        >
          <RotateCcw size={18} />
          <span>Ask Another What If</span>
        </button>
      </div>

      {/* 2. THE BRANCHING TIMELINE VISUALIZER */}
      <div ref={timelineRef} style={{ width: '100%', scrollMarginTop: '40px' }}>
        <TimelineVisualizer timeline={timeline} />
      </div>

      {/* Bottom Action Bar */}
      <div className="result-action-bar">
        <button
          className="btn-primary-action"
          onClick={onReset}
          style={{ padding: '16px 36px', fontSize: '1rem' }}
        >
          <Sparkles size={20} />
          <span>Ask Another What If</span>
        </button>
      </div>

      {/* 3. COLLAPSIBLE TECHNICAL DETAILS SECTION */}
      <div className="collapsible-technical-section">
        <button
          type="button"
          className="collapsible-toggle-btn glass-panel"
          onClick={() => setShowTechnicalDetails(prev => !prev)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={18} color="var(--quantum-cyan)" />
            <span className="font-scifi" style={{ letterSpacing: '0.12em', fontSize: '0.9rem' }}>
              {showTechnicalDetails ? 'HIDE TIMELINE DETAILS' : 'SHOW TIMELINE DETAILS'}
            </span>
          </div>
          {showTechnicalDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showTechnicalDetails && (
          <div className="technical-details-drawer glass-panel">
            <div className="tech-drawer-header">
              <div>
                <span className="tech-label font-mono">TIMELINE IDENTIFIER</span>
                <div className="tech-id-val font-scifi">{timeline.timelineId}</div>
                <div className="tech-sub font-mono">{timeline.designation} (Parent: {timeline.parentTimeline})</div>
              </div>

              {/* Stability Gauge in Technical view */}
              <div className="tech-stability-box">
                <div className="tech-stat-num font-scifi" style={{ color: timeline.stability > 70 ? '#34d399' : '#f59e0b' }}>
                  {timeline.stability}%
                </div>
                <span className="tech-label font-mono">QUANTUM STABILITY</span>
              </div>
            </div>

            {/* Technical Metrics Grid */}
            <div className="tech-metrics-grid">
              <div className="tech-metric-card">
                <span className="tech-label font-mono">ORIGIN EVENT</span>
                <p className="tech-metric-title">{timeline.originEvent}</p>
                <p className="tech-metric-sub">Nexus split detected at causal anchor</p>
              </div>

              <div className="tech-metric-card">
                <span className="tech-label font-mono">DIVERGENT PERFORMER</span>
                <p className="tech-metric-title" style={{ color: '#fda4af' }}>{timeline.divergence.alternateActor}</p>
                <p className="tech-metric-sub">Replaced: {timeline.divergence.originalActor}</p>
              </div>

              <div className="tech-metric-card">
                <span className="tech-label font-mono">STATUS</span>
                <p className="tech-metric-title" style={{ color: 'var(--divergence-red)' }}>{timeline.status}</p>
                <p className="tech-metric-sub">{timeline.simulatedNodeCount} new causal nodes established</p>
              </div>
            </div>

            {/* Cancelled / Voided Events */}
            {timeline.cancelledEvents && timeline.cancelledEvents.length > 0 && (
              <div className="tech-cancelled-box">
                <div className="tech-label font-mono" style={{ color: '#f87171', marginBottom: '8px' }}>
                  VOIDED CANON EVENTS (UN-TRIGGERED):
                </div>
                {timeline.cancelledEvents.map((evt, idx) => (
                  <div key={idx} className="tech-cancelled-item">
                    <span style={{ color: '#f87171', fontWeight: 700 }}>✕ {evt.title}</span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}> — {evt.reason}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Raw Simulated Nodes Stream */}
            <div style={{ marginTop: '20px' }}>
              <span className="tech-label font-mono" style={{ marginBottom: '10px', display: 'block' }}>
                ALL TIMELINE NODES ({timeline.events?.length || 0}):
              </span>
              <div className="tech-nodes-list">
                {timeline.events?.map((ev, i) => (
                  <div key={ev.id || i} className="tech-node-row">
                    <span className={ev.badge === 'CANON' ? 'badge-canon' : 'badge-simulated'}>
                      {ev.badge}
                    </span>
                    <span style={{ fontWeight: 600, color: '#ffffff' }}>{ev.title}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>({ev.movie}, {ev.year})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
