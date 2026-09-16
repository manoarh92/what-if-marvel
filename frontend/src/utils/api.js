/**
 * Multiverse API Client
 * Interfaces with the local simulation backend.
 */

export async function simulateQuestion(question) {
  const response = await fetch('/api/simulate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question })
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || "I couldn't understand the timeline change. Try asking: What if...");
  }

  return data;
}

export async function fetchPresets() {
  try {
    const response = await fetch('/api/scenarios/presets');
    const data = await response.json();
    return data.presets || [];
  } catch (err) {
    console.warn('Failed to fetch presets:', err);
    return [];
  }
}

export async function fetchCanonEvents() {
  try {
    const response = await fetch('/api/canon/events');
    const data = await response.json();
    return data.events || [];
  } catch (err) {
    console.warn('Failed to fetch canon events:', err);
    return [];
  }
}
