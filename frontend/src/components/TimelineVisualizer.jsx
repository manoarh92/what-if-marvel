import React, { useState } from 'react';
import { GitBranch, Shield, Zap, Info, Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';

export default function TimelineVisualizer({ timeline }) {
  const [selectedNode, setSelectedNode] = useState(null);

  if (!timeline || !timeline.events) return null;

  const divergence = timeline.divergence || {};
  const originEventTitle = timeline.originEvent || 'Canonical Anchor';
  const alternateActor = divergence.alternateActor || 'The Hero';
  const originalActor = divergence.originalActor || 'Original Figure';
  const ending = timeline.ending || {};

  return (
    <div className="glass-panel branch-visualizer-card">
      <div className="section-header">
        <div>
          <h3 className="section-title font-display" style={{ fontSize: '1.5rem' }}>
            <GitBranch size={24} color="var(--divergence-red)" />
            TIMELINE BRANCH
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Where this universe split from the Sacred Timeline
          </p>
        </div>
      </div>

      {/* High-Impact Clean Branching Visualization */}
      <div className="clean-branch-container">
        {/* Step 1: MCU PRIME TRUNK */}
        <div className="branch-step">
          <div className="branch-node-pill prime font-scifi">
            <Shield size={16} />
            <span>MCU PRIME (EARTH-616)</span>
          </div>
          <div className="branch-trunk-line"></div>
        </div>

        {/* Step 2: NEXUS CANON ANCHOR */}
        <div className="branch-step">
          <div className="branch-node-box anchor">
            <div className="branch-meta-tag font-scifi">HISTORICAL ANCHOR</div>
            <div className="branch-node-title">{originEventTitle.toUpperCase()}</div>
            <div className="branch-node-desc">The critical junction where reality branched</div>
          </div>
          <div className="branch-fork-split-visual">
            <div className="fork-connector left"></div>
            <div className="fork-connector right"></div>
          </div>
        </div>

        {/* Step 3: THE SPLIT (Canon vs Alternate) */}
        <div className="branch-fork-grid">
          {/* Left Branch: Canon Path */}
          <div className="branch-path-column canon">
            <div className="path-header font-scifi">
              <span className="dot canon"></span>
              CANON TIMELINE
            </div>
            <div className="branch-card canon">
              <div className="card-badge font-scifi">ORIGINAL PATH</div>
              <h4 className="card-title">{originalActor.toUpperCase()} OUTCOME</h4>
              <p className="card-desc">
                The Sacred Timeline proceeded along its established course with all prime casualties.
              </p>
              <div className="card-fate-tag dead font-mono">
                CANON PRIME CONTINUITY
              </div>
            </div>
          </div>

          {/* Right Branch: Simulated Alternate Reality */}
          <div className="branch-path-column alternate">
            <div className="path-header font-scifi">
              <span className="dot alternate"></span>
              THIS ALTERNATE REALITY
            </div>
            <div className="branch-card alternate active-branch">
              <div className="card-badge alt font-scifi">DIVERGENT NEXUS</div>
              <h4 className="card-title font-display">
                {alternateActor.toUpperCase()} DEFIES FATE
              </h4>
              <p className="card-desc">
                {divergence.description || divergence.action}
              </p>
              <div className="card-fate-tag alive font-mono">
                ✓ DIVERGENCE ESTABLISHED • REALITY ALTERED
              </div>
            </div>

            <div className="branch-down-arrow">↓</div>

            {/* Step 4: NEW CONTINUUM FORGED */}
            <div className="branch-card new-universe">
              <div className="card-badge universe font-scifi">NEW CONTINUUM</div>
              <h4 className="card-title">{ending.headline || "NEW UNIVERSE FORGED"}</h4>
              <p className="card-desc">
                {ending.synopsis || "An alternate destiny takes shape across the multiverse."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Modal if inspected */}
      {selectedNode && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedNode(null)}
        >
          <div
            className="glass-panel modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge-simulated">
                {selectedNode.badge || 'TIMELINE NODE'}
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <h3 className="font-display" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>
              {selectedNode.title}
            </h3>

            <p style={{ color: '#cbd5e1', lineHeight: '1.6', marginBottom: '20px' }}>
              {selectedNode.description}
            </p>

            <button
              onClick={() => setSelectedNode(null)}
              className="btn-primary-action"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
