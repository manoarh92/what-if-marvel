const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const { analyzeScenario } = require('../services/scenarioAnalyzer');
const { generateAlternateTimeline } = require('../services/timelineEngine');
const { generateNarrative } = require('../services/storyGenerator');

const dataDir = path.join(__dirname, '../../data');
const scenarios = JSON.parse(fs.readFileSync(path.join(dataDir, 'scenarios.json'), 'utf8'));
const canonEvents = JSON.parse(fs.readFileSync(path.join(dataDir, 'events.json'), 'utf8'));
const characters = JSON.parse(fs.readFileSync(path.join(dataDir, 'characters.json'), 'utf8'));

/**
 * POST /api/simulate
 * Core simulation pipeline:
 * User Question -> Scenario Analyzer -> Canon KB -> Timeline Engine -> Story Generator -> Cinematic Result
 */
router.post('/simulate', (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "I couldn't understand the timeline change. Try asking: What if..."
      });
    }

    // Step 1: Scenario Analyzer parses the CURRENT user query
    const analysis = analyzeScenario(question);

    if (!analysis.isValid) {
      return res.status(400).json({
        success: false,
        error: analysis.error || "I couldn't understand the timeline change. Try asking: What if..."
      });
    }

    // Step 2: Timeline Engine calculates branch and consequences
    const timeline = generateAlternateTimeline(analysis);

    // Step 3: Story Generator builds the episodic cinematic narrative
    const narrative = generateNarrative(analysis, timeline);

    // Requirement 10: DEBUG/DEV verification payload
    return res.json({
      success: true,
      query: question,
      parsedScenario: {
        actionType: analysis.actionType,
        shortTitle: analysis.shortTitle,
        character: analysis.character?.name,
        target: analysis.target?.name,
        targetEvent: analysis.targetEvent?.title,
        movie: analysis.movie,
        changedAction: analysis.changedAction
      },
      divergenceEvent: analysis.divergenceEvent || analysis.targetEvent?.title,
      affectedCharacters: analysis.affectedCharacters || timeline.characterChanges.map(c => c.name),
      changedEvents: analysis.changedEvents || timeline.cancelledEvents.map(c => c.title),
      analysis,
      timeline,
      narrative,
      meta: {
        timestamp: new Date().toISOString(),
        engineVersion: 'v0.2-dynamic-semantic'
      }
    });
  } catch (error) {
    console.error('Simulation pipeline error:', error);
    return res.status(500).json({
      success: false,
      error: "I couldn't understand the timeline change. Try asking: What if..."
    });
  }
});

/**
 * GET /api/scenarios/presets
 */
router.get('/scenarios/presets', (req, res) => {
  res.json({
    success: true,
    presets: scenarios
  });
});

/**
 * GET /api/canon/events
 */
router.get('/canon/events', (req, res) => {
  res.json({
    success: true,
    events: canonEvents
  });
});

/**
 * GET /api/canon/characters
 */
router.get('/canon/characters', (req, res) => {
  res.json({
    success: true,
    characters
  });
});

module.exports = router;
