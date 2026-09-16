import React from 'react';
import { Eye, BookOpen, Quote } from 'lucide-react';

export default function WatcherNarrative({ narrative, ending }) {
  if (!narrative) return null;

  return (
    <div className="glass-panel watcher-card">
      <div className="watcher-badge">
        <Eye size={16} />
        <span>{narrative.narrator || 'UATU THE WATCHER'}</span>
      </div>

      <div className="watcher-quote">
        "{narrative.cosmicQuote}"
      </div>

      <p style={{ fontSize: '1.08rem', color: '#f1f5f9', lineHeight: '1.7', marginBottom: '28px' }}>
        {narrative.prologue}
      </p>

      {/* 3-Act Narrative Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {narrative.actOne && (
          <div className="narrative-act-box">
            <div className="act-title">{narrative.actOne.title}</div>
            <p className="act-narration">{narrative.actOne.narration}</p>
          </div>
        )}

        {narrative.actTwo && (
          <div className="narrative-act-box">
            <div className="act-title">{narrative.actTwo.title}</div>
            <p className="act-narration">{narrative.actTwo.narration}</p>
          </div>
        )}

        {narrative.actThree && (
          <div className="narrative-act-box">
            <div className="act-title">{narrative.actThree.title}</div>
            <p className="act-narration">{narrative.actThree.narration}</p>
          </div>
        )}

        {narrative.epilogue && (
          <div className="narrative-act-box" style={{ borderLeft: '3px solid var(--quantum-cyan)', background: 'rgba(56, 189, 248, 0.05)' }}>
            <div className="act-title" style={{ color: 'var(--quantum-cyan)' }}>{narrative.epilogue.title}</div>
            <p className="act-narration">{narrative.epilogue.narration}</p>
            {narrative.epilogue.closingReflection && (
              <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic' }}>
                — {narrative.epilogue.closingReflection}
              </div>
            )}
          </div>
        )}
      </div>

      {ending && (
        <div style={{
          marginTop: '28px',
          padding: '20px',
          borderRadius: '12px',
          background: 'rgba(10, 15, 30, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div className="font-scifi" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
            BRANCH SYNOPSIS
          </div>
          <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '8px' }}>
            {ending.headline}
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>
            {ending.synopsis}
          </p>
        </div>
      )}
    </div>
  );
}
