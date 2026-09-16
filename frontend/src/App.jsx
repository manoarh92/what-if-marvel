import React, { useState } from 'react';
import CosmicBackground from './components/CosmicBackground';
import SimulationLoader from './components/SimulationLoader';
import ObservatoryHome from './pages/ObservatoryHome';
import TimelineResult from './pages/TimelineResult';
import { simulateQuestion } from './utils/api';
import { Sparkles, Activity } from 'lucide-react';
import './styles/index.css';
import './styles/observatory.css';
import './styles/timeline.css';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'result'
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationData, setSimulationData] = useState(null);
  const [error, setError] = useState(null);

  // Buffer holding pending simulation response while cinematic loader runs
  const [pendingData, setPendingData] = useState(null);

  const handleStartSimulation = async (question) => {
    try {
      setError(null);
      setIsSimulating(true);

      // Trigger backend simulation
      const result = await simulateQuestion(question);
      setPendingData(result);
    } catch (err) {
      console.error('Simulation error:', err);
      setError(err.message || 'The fabric of space-time resisted calculation.');
      setIsSimulating(false);
    }
  };

  const handleLoaderComplete = () => {
    if (pendingData) {
      setSimulationData(pendingData);
      setView('result');
      setPendingData(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsSimulating(false);
  };

  const handleReset = () => {
    setView('home');
    setSimulationData(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="observatory-container">
      {/* Dynamic Cosmic Multiverse Background */}
      <CosmicBackground />

      {/* Top Observatory Navigation Bar */}
      <header className="observatory-header">
        <div className="brand-badge" onClick={handleReset}>
          <div className="brand-icon-wrapper">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="brand-title">WHAT IF...?</div>
            <div className="brand-subtitle">Multiverse Timeline Simulator</div>
          </div>
        </div>

        <div className="tva-status-pill">
          <span className="status-dot"></span>
          <span>TVA MONITORS: ACTIVE</span>
        </div>
      </header>

      {/* Main Content View */}
      <main style={{ width: '100%', position: 'relative', zIndex: 10 }}>
        {error && (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto 20px',
            padding: '16px 20px',
            borderRadius: '12px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {view === 'home' ? (
          <ObservatoryHome
            onSimulate={handleStartSimulation}
            isSimulating={isSimulating}
          />
        ) : (
          <TimelineResult
            simulationData={simulationData}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Short Cinematic Loading Sequence */}
      {isSimulating && (
        <SimulationLoader onComplete={handleLoaderComplete} />
      )}
    </div>
  );
}
