import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, GitBranch, Zap } from 'lucide-react';

const STEPS = [
  { id: 0, label: 'ANALYZING YOUR QUESTION...', icon: Sparkles },
  { id: 1, label: 'FINDING THE MOMENT...', icon: Zap },
  { id: 2, label: 'BREAKING THE TIMELINE...', icon: GitBranch },
  { id: 3, label: 'CALCULATING THE RIPPLE...', icon: Loader2 },
  { id: 4, label: 'A NEW REALITY HAS BEEN CREATED.', icon: CheckCircle2 }
];

export default function SimulationLoader({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
          return prev;
        }
      });
    }, 550);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="simulation-loader-overlay">
      <div className="loader-card">
        <div className="loader-radar">
          <div className="radar-ring radar-ring-1"></div>
          <div className="radar-ring radar-ring-2"></div>
          <div className="radar-core"></div>
        </div>

        <h3 className="font-display" style={{ fontSize: '1.4rem', letterSpacing: '0.12em', color: '#ffffff', marginBottom: '6px' }}>
          WHAT IF...?
        </h3>
        <p style={{ color: 'var(--quantum-cyan)', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }} className="font-mono">
          Exploring Another Reality
        </p>

        <div className="loader-step-list">
          {STEPS.map((step) => {
            const isDone = currentStep > step.id;
            const isActive = currentStep === step.id;
            const Icon = step.icon;

            let stateClass = 'pending';
            if (isDone) stateClass = 'completed';
            if (isActive) stateClass = 'active';

            return (
              <div key={step.id} className={`loader-step-item ${stateClass}`}>
                {isDone ? (
                  <CheckCircle2 size={18} color="#34d399" />
                ) : isActive ? (
                  <Loader2 size={18} className="animate-spin" color="var(--quantum-cyan)" />
                ) : (
                  <Icon size={18} color="#64748b" />
                )}
                <span style={{ fontWeight: isActive ? 700 : 500 }}>{step.label}</span>
                {isDone && (
                  <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#34d399' }} className="font-mono">
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
