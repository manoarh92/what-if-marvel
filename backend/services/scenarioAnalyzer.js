/**
 * SCENARIO ANALYZER
 * 
 * Semantic parser that extracts actors, targets, action intents, and canonical nexus events
 * from natural language MCU What-If inquiries.
 * 
 * Never hardcodes "Thor snapped" as a fallback.
 * Gracefully rejects unrecognized questions with helpful guidance.
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../data');
const characters = JSON.parse(fs.readFileSync(path.join(dataDir, 'characters.json'), 'utf8'));
const events = JSON.parse(fs.readFileSync(path.join(dataDir, 'events.json'), 'utf8'));
const movies = JSON.parse(fs.readFileSync(path.join(dataDir, 'movies.json'), 'utf8'));
const scenarios = JSON.parse(fs.readFileSync(path.join(dataDir, 'scenarios.json'), 'utf8'));

/**
 * Analyzes a What-If question and returns a structured parsedScenario.
 * @param {string} question - The user's query
 * @returns {object} Extracted scenario metadata
 */
function analyzeScenario(question) {
  if (!question || typeof question !== 'string' || question.trim().length < 5) {
    return {
      isValid: false,
      error: "I couldn't understand the timeline change. Try asking: What if..."
    };
  }

  const raw = question.trim();
  const text = raw.toLowerCase();

  // Ensure it looks like a What-If inquiry
  const hasWhatIf = text.includes('what if') || text.includes('what would happen') || text.includes('suppose');
  
  // Extract primary character / actor
  const actor = extractActor(text);
  const target = extractTarget(text, actor);
  const movie = extractMovie(text);

  // 1. Specific High-Intent Pattern Matches (covers multiple synonyms of same idea)

  // Pattern A: Thor cuts Thanos' head / goes for head / kills Thanos in Infinity War
  const isThorAimsForHead = (text.includes('thor') || actor?.id === 'char-thor') &&
    (
      text.includes('head') ||
      (text.includes('thanos') && (text.includes('cut') || text.includes('kill') || text.includes('axe') || text.includes('stormbreaker') || text.includes('behead') || text.includes('chop')))
    ) &&
    !text.includes('snap in endgame') && !text.includes('snapped in endgame');

  if (isThorAimsForHead) {
    const snapEvent = events.find(e => e.id === 'event-5') || events[4];
    return {
      isValid: true,
      query: raw,
      scenarioId: 'thor-head-infinity-war',
      actionType: 'THOR_KILLS_THANOS_INFINITY_WAR',
      shortTitle: 'Thor Went For The Head',
      character: characters.find(c => c.id === 'char-thor'),
      target: characters.find(c => c.id === 'char-thanos'),
      targetEvent: snapEvent,
      divergenceEvent: snapEvent.title,
      movie: 'Avengers: Infinity War',
      location: 'Wakanda, Earth',
      originalPerformer: 'Thanos',
      newPerformer: 'Thor Odinson',
      changedAction: 'Thor strikes Stormbreaker directly into Thanos\' head, killing the Mad Titan before he can snap.',
      divergencePoint: 'Thor aims for the head in Wakanda, killing Thanos before the Snap can occur.',
      affectedCharacters: ['Thor Odinson', 'Thanos', 'Tony Stark', 'Vision', 'Wanda Maximoff'],
      changedEvents: ['The Snap is prevented', 'The Decimation never occurs', 'Time Heist never needed']
    };
  }

  // Pattern B: Steve Rogers never gives Sam the shield / keeps shield
  const isSteveShieldRefusal = (text.includes('steve') || text.includes('captain america') || actor?.id === 'char-steve-rogers') &&
    (text.includes('shield') || text.includes('sam') || text.includes('falcon')) &&
    (text.includes('never') || text.includes('not') || text.includes('refus') || text.includes('kept') || text.includes('keep') || text.includes('didn'));

  if (isSteveShieldRefusal) {
    const shieldEvent = events.find(e => e.id === 'event-14') || events[13];
    return {
      isValid: true,
      query: raw,
      scenarioId: 'steve-keeps-shield',
      actionType: 'STEVE_KEEPS_SHIELD',
      shortTitle: 'Steve Rogers Keeps The Shield',
      character: characters.find(c => c.id === 'char-steve-rogers'),
      target: characters.find(c => c.id === 'char-sam-wilson'),
      targetEvent: shieldEvent,
      divergenceEvent: shieldEvent.title,
      movie: 'Avengers: Endgame',
      location: 'Lakeside bench, Upstate New York',
      originalPerformer: 'Steve Rogers',
      newPerformer: 'Steve Rogers',
      changedAction: 'Steve Rogers chooses not to pass the shield to Sam Wilson, keeping the Captain America mantle buried with his generation.',
      divergencePoint: 'Steve Rogers retains the shield on the bench, leaving the future of Captain America unassigned.',
      affectedCharacters: ['Steve Rogers', 'Sam Wilson', 'Bucky Barnes', 'John Walker'],
      changedEvents: ['Shield is not bequeathed', 'Falcon remains an independent operative', 'US Government commissions their own symbol']
    };
  }

  // Pattern C: Peter Parker never snapped / survived the snap
  const isPeterNeverSnapped = (text.includes('peter') || text.includes('spider-man') || text.includes('spidey') || actor?.id === 'char-peter-parker') &&
    (text.includes('snap') || text.includes('blip') || text.includes('dust')) &&
    (text.includes('never') || text.includes('not') || text.includes('survive') || text.includes('didn'));

  if (isPeterNeverSnapped) {
    const snapEvent = events.find(e => e.id === 'event-5') || events[4];
    return {
      isValid: true,
      query: raw,
      scenarioId: 'peter-survives-snap',
      actionType: 'PETER_SURVIVES_SNAP',
      shortTitle: 'Peter Parker Survived The Snap',
      character: characters.find(c => c.id === 'char-peter-parker'),
      target: characters.find(c => c.id === 'char-tony-stark'),
      targetEvent: snapEvent,
      divergenceEvent: 'The Snap on Titan',
      movie: 'Avengers: Infinity War',
      location: 'Titan (Dead Planet)',
      originalPerformer: 'Thanos',
      newPerformer: 'Peter Parker',
      changedAction: 'Peter Parker does not turn to dust on Titan; he survives alongside Tony Stark and Nebula.',
      divergencePoint: 'Peter Parker withstands the Snap, returning to Earth with Tony during the five-year blip.',
      affectedCharacters: ['Peter Parker', 'Tony Stark', 'Aunt May', 'Ned Leeds'],
      changedEvents: ['Peter never dusted', 'Tony does not withdraw into total isolation', 'Spider-Man guards New York during the 5-year gap']
    };
  }

  // Pattern D: Loki survived
  const isLokiSurvived = (text.includes('loki') || actor?.id === 'char-loki') &&
    (text.includes('survive') || text.includes('lived') || text.includes('didn\'t die') || text.includes('did not die') || text.includes('escaped'));

  if (isLokiSurvived) {
    const statesEvent = events.find(e => e.id === 'event-4') || events[3];
    return {
      isValid: true,
      query: raw,
      scenarioId: 'loki-survived',
      actionType: 'LOKI_SURVIVED',
      shortTitle: 'Loki Survived Thanos',
      character: characters.find(c => c.id === 'char-loki'),
      target: characters.find(c => c.id === 'char-thanos'),
      targetEvent: statesEvent,
      divergenceEvent: 'Thanos attacks Statesman',
      movie: 'Avengers: Infinity War',
      location: 'Statesman (Refugee Vessel)',
      originalPerformer: 'Thanos',
      newPerformer: 'Loki Laufeyson',
      changedAction: 'Loki casts an illusion to fake his death and teleports away with the Space Stone.',
      divergencePoint: 'Loki escapes Thanos aboard the Statesman, keeping the Tesseract out of the Titan\'s hands.',
      affectedCharacters: ['Loki', 'Thor', 'Thanos', 'Hulk', 'Doctor Strange'],
      changedEvents: ['Loki avoids choking death', 'Thanos delayed in acquiring Space Stone', 'Thor reunited with his brother early']
    };
  }

  // Pattern E: Wanda joined Thanos / sided with Thanos
  const isWandaJoinedThanos = (text.includes('wanda') || text.includes('scarlet witch') || actor?.id === 'char-wanda-maximoff') &&
    (text.includes('join') || text.includes('sided') || text.includes('team') || text.includes('allied') || text.includes('with thanos'));

  if (isWandaJoinedThanos) {
    const wakandaEvent = events.find(e => e.id === 'event-4') || events[3];
    return {
      isValid: true,
      query: raw,
      scenarioId: 'wanda-joins-thanos',
      actionType: 'WANDA_JOINS_THANOS',
      shortTitle: 'Wanda Joined Thanos',
      character: characters.find(c => c.id === 'char-wanda-maximoff'),
      target: characters.find(c => c.id === 'char-thanos'),
      targetEvent: wakandaEvent,
      divergenceEvent: 'Battle of Wakanda',
      movie: 'Avengers: Infinity War',
      location: 'Wakanda, Earth',
      originalPerformer: 'Wanda Maximoff',
      newPerformer: 'Wanda Maximoff',
      changedAction: 'Wanda surrenders the Mind Stone willingly and pledges her chaos magic to Thanos\' cause.',
      divergencePoint: 'Wanda joins Thanos instead of fighting him, overwhelming the Avengers in Wakanda.',
      affectedCharacters: ['Wanda Maximoff', 'Vision', 'Thanos', 'Steve Rogers'],
      changedEvents: ['Vision deconstructed voluntarily', 'Avengers crushed in Wakanda', 'Chaos magic enhances the Infinity Gauntlet']
    };
  }

  // Pattern F: Explicit Thor Snap in Endgame (ONLY if user specifically asked for Thor snapping)
  const isThorSnapEndgame = (text.includes('thor') || actor?.id === 'char-thor') &&
    (text.includes('snap') || text.includes('gauntlet')) &&
    (text.includes('endgame') || text.includes('tony') || text.includes('final snap'));

  if (isThorSnapEndgame) {
    const snapEvent = events.find(e => e.id === 'event-11') || events[10];
    return {
      isValid: true,
      query: raw,
      scenarioId: 'thor-snap-endgame',
      actionType: 'THOR_SNAPS_ENDGAME',
      shortTitle: 'Thor Performed The Final Snap',
      character: characters.find(c => c.id === 'char-thor'),
      target: characters.find(c => c.id === 'char-tony-stark'),
      targetEvent: snapEvent,
      divergenceEvent: snapEvent.title,
      movie: 'Avengers: Endgame',
      location: 'Ruins of Avengers Compound, Upstate New York',
      originalPerformer: 'Tony Stark',
      newPerformer: 'Thor Odinson',
      changedAction: 'Thor claims the Nano Gauntlet and snaps his fingers instead of Tony Stark.',
      divergencePoint: 'Thor takes the Gauntlet from Thanos, absorbing the lethal cosmic blast with divine constitution.',
      affectedCharacters: ['Thor Odinson', 'Tony Stark', 'Thanos', 'Peter Parker'],
      changedEvents: ['Tony Stark death prevented', 'Thor survives cosmic blast', 'Avengers core remains intact']
    };
  }

  // 2. Generic Reusable Scenario Parser for any other valid Marvel question
  if (actor) {
    const matchedEvent = extractEvent(text, actor) || events[0];
    const detectedAction = extractActionSummary(text, actor.name, target?.name);

    return {
      isValid: true,
      query: raw,
      scenarioId: `custom-${actor.id}-${Date.now().toString().slice(-4)}`,
      actionType: 'CUSTOM_DIVERGENCE',
      shortTitle: `${actor.name}'s Choice`,
      character: actor,
      target: target,
      targetEvent: matchedEvent,
      divergenceEvent: matchedEvent.title,
      movie: movie?.title || matchedEvent.movie || 'Avengers Continuity',
      location: matchedEvent.location || 'Earth',
      originalPerformer: matchedEvent.participants?.[0] || 'The Hero',
      newPerformer: actor.name,
      changedAction: detectedAction,
      divergencePoint: `${actor.name} alters the outcome of ${matchedEvent.title}.`,
      affectedCharacters: [actor.name, target ? target.name : 'The Avengers'],
      changedEvents: [`Canonical outcome of ${matchedEvent.title} altered`, 'Multiverse branch created']
    };
  }

  // 3. Could not understand question
  return {
    isValid: false,
    error: "I couldn't understand the timeline change. Try asking: What if..."
  };
}

function extractActor(text) {
  for (const c of characters) {
    const nameWords = c.name.toLowerCase().split(/\s+/);
    for (const w of nameWords) {
      if (w.length > 2 && text.includes(w)) {
        return c;
      }
    }
    if (c.aliases) {
      for (const a of c.aliases) {
        if (text.includes(a.toLowerCase())) {
          return c;
        }
      }
    }
  }
  return null;
}

function extractTarget(text, actor) {
  for (const c of characters) {
    if (actor && c.id === actor.id) continue;
    const nameWords = c.name.toLowerCase().split(/\s+/);
    for (const w of nameWords) {
      if (w.length > 2 && text.includes(w)) {
        return c;
      }
    }
    if (c.aliases) {
      for (const a of c.aliases) {
        if (text.includes(a.toLowerCase())) {
          return c;
        }
      }
    }
  }
  return null;
}

function extractMovie(text) {
  for (const m of movies) {
    if (text.includes(m.title.toLowerCase())) {
      return m;
    }
  }
  if (text.includes('infinity war')) return movies.find(m => m.id === 'movie-infinity-war');
  if (text.includes('endgame')) return movies.find(m => m.id === 'movie-endgame');
  if (text.includes('civil war')) return movies.find(m => m.id === 'movie-civil-war');
  return null;
}

function extractEvent(text, actor) {
  if (text.includes('infinity war') || text.includes('wakanda')) {
    return events.find(e => e.id === 'event-4') || events.find(e => e.id === 'event-5');
  }
  if (text.includes('shield') || text.includes('sam')) {
    return events.find(e => e.id === 'event-14');
  }
  if (text.includes('time heist') || text.includes('quantum')) {
    return events.find(e => e.id === 'event-7');
  }
  if (text.includes('titan')) {
    return events.find(e => e.id === 'event-3');
  }
  if (text.includes('civil war') || text.includes('airport')) {
    return events.find(e => e.id === 'event-2');
  }
  if (text.includes('new york') || text.includes('chitauri')) {
    return events.find(e => e.id === 'event-1');
  }

  // Keyword scan in event titles
  for (const ev of events) {
    const words = ev.title.toLowerCase().split(/\s+/);
    for (const w of words) {
      if (w.length > 3 && text.includes(w)) {
        return ev;
      }
    }
  }

  // Match by actor's major events
  if (actor && actor.major_events && actor.major_events.length > 0) {
    for (const maj of actor.major_events) {
      const found = events.find(e => e.title.toLowerCase().includes(maj.toLowerCase()));
      if (found) return found;
    }
  }

  return events[0];
}

function extractActionSummary(text, actorName, targetName) {
  const clean = text.replace(/what if/i, '').replace(/\?/g, '').trim();
  if (clean.length > 0) {
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }
  return `${actorName} acts against fate.`;
}

module.exports = {
  analyzeScenario
};
