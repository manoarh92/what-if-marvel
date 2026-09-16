/**
 * STORY GENERATOR
 * 
 * Generates dynamic, cinematic episodic Marvel "What If...?" stories
 * strictly derived from the parsed user query and alternate timeline data.
 * 
 * Writing Rules:
 * - Simple English
 * - Short sentences
 * - Conversational, dramatic pacing
 * - Zero academic jargon
 * - Clear, high-impact story beats
 */

function generateNarrative(analysis, timelineData) {
  const actionType = analysis?.actionType || 'CUSTOM_DIVERGENCE';

  switch (actionType) {
    case 'THOR_KILLS_THANOS_INFINITY_WAR':
      return {
        episodeTitle: "WHAT IF... THOR WENT FOR THE HEAD?",
        tagline: "One strike aimed true. Half the universe spared.",
        theDivergence: {
          title: "WHAT CHANGED?",
          headline: "THE MOMENT THAT CHANGED EVERYTHING",
          lines: [
            "Thanos descends into Wakanda, all six Infinity Stones nearly unified.",
            "Stormbreaker tears through the sky, crackling with divine lightning.",
            "In your universe, Thor struck Thanos in the chest.",
            "BUT IN THIS UNIVERSE, THOR AIMS FOR THE HEAD."
          ]
        },
        theMoment: {
          badge: "THE MOMENT",
          action: "[ STORMBREAKER DECAPITATES THANOS ]",
          lines: [
            "The enchanted axe cleaves the Mad Titan before his fingers can close.",
            "The Gauntlet clatters to the ground, its stones flickering into silence.",
            "There is no snap.",
            "No one turns to dust.",
            "The war ends right there in Wakanda."
          ]
        },
        rippleEffects: timelineData.characterChanges.map(c => ({
          character: c.name,
          original: c.original,
          thisUniverse: c.thisUniverse,
          highlight: c.highlight,
          summary: c.summary
        })),
        yearsLater: {
          badge: "5 YEARS LATER",
          headline: "THE FIVE YEARS THAT NEVER WERE",
          lines: [
            "The tragedy of the Blip never happened.",
            "Trillions of families across the cosmos were spared five years of agony.",
            "Tony Stark was brought safely home from Titan, raising Morgan in true peace.",
            "And Thor stands tall as the proud, unburdened King of New Asgard."
          ]
        },
        theTwist: {
          badge: "BUT THEN...",
          warning: "A BEACON IN THE COSMOS",
          subtext: "SIX STONES IN ONE PLACE",
          lines: [
            "The six Infinity Stones remained assembled on Earth under human watch.",
            "Their combined radiation sent a blinding signal across deep space.",
            "Entities far older than Thanos have now turned their eyes toward Earth."
          ]
        },
        alternateEnding: {
          title: "ALTERNATE ENDING",
          lines: [
            "Thor saved the universe from Thanos with a single lethal blow.",
            "Earth celebrated a victory that cost no lives.",
            "Yet in the infinite multiverse, hoarding the power of gods always carries a price."
          ]
        }
      };

    case 'STEVE_KEEPS_SHIELD':
      return {
        episodeTitle: "WHAT IF... STEVE ROGERS KEPT THE SHIELD?",
        tagline: "A symbol retired. A future unwritten.",
        theDivergence: {
          title: "WHAT CHANGED?",
          headline: "THE MOMENT THAT CHANGED EVERYTHING",
          lines: [
            "An elderly Steve Rogers sits on the lakeside bench in 2023.",
            "Sam Wilson walks over, expecting to be handed the iconic shield.",
            "Steve looks at his friend and keeps the shield locked in its leather case.",
            "HE REFUSES TO PASS THE MANTLE."
          ]
        },
        theMoment: {
          badge: "THE MOMENT",
          action: "[ CAPTAIN AMERICA IS OFFICIALLY RETIRED ]",
          lines: [
            "Steve tells Sam that no one else should bear the weight of Captain America.",
            "The shield is placed into a museum case.",
            "For the first time since World War II, America has no Captain."
          ]
        },
        rippleEffects: timelineData.characterChanges.map(c => ({
          character: c.name,
          original: c.original,
          thisUniverse: c.thisUniverse,
          highlight: c.highlight,
          summary: c.summary
        })),
        yearsLater: {
          badge: "YEARS LATER",
          headline: "THE VACUUM OF A LEGEND",
          lines: [
            "Sam Wilson forged his own path as an upgraded, independent Falcon.",
            "The public felt lost without their red, white, and blue protector.",
            "And the government rushed to fill the void."
          ]
        },
        theTwist: {
          badge: "BUT THEN...",
          warning: "THE GOVERNMENT FORGES US AGENT",
          subtext: "A SOLDIER WITHOUT RESTRAINT",
          lines: [
            "Without an anointed successor, the Pentagon appointed John Walker.",
            "Armed with a military-grade weapon, Walker operates without Steve's moral compass.",
            "A darker hero emerges in Steve's absence."
          ]
        },
        alternateEnding: {
          title: "ALTERNATE ENDING",
          lines: [
            "Steve Rogers lived a quiet life, believing he spared his friend.",
            "Yet symbols cannot simply disappear.",
            "They are seized by whoever has the power to wield them."
          ]
        }
      };

    case 'PETER_SURVIVES_SNAP':
      return {
        episodeTitle: "WHAT IF... PETER PARKER SURVIVED THE SNAP?",
        tagline: "The kid who didn't fade.",
        theDivergence: {
          title: "WHAT CHANGED?",
          headline: "THE MOMENT THAT CHANGED EVERYTHING",
          lines: [
            "On the dead surface of Titan, the dusting begins.",
            "Quill, Drax, and Strange fade into ash.",
            "Peter grabs Tony Stark, crying that he doesn't want to go...",
            "BUT THIS TIME, PETER'S DUSTING STOPS."
          ]
        },
        theMoment: {
          badge: "THE MOMENT",
          action: "[ SPIDER-MAN WITHSTANDS THE BLIP ]",
          lines: [
            "Peter collapses into Tony's arms, gasping for breath.",
            "He is alive.",
            "Tony clutches him in disbelief.",
            "They are not alone in the dark."
          ]
        },
        rippleEffects: timelineData.characterChanges.map(c => ({
          character: c.name,
          original: c.original,
          thisUniverse: c.thisUniverse,
          highlight: c.highlight,
          summary: c.summary
        })),
        yearsLater: {
          badge: "5 YEARS LATER",
          headline: "THE BROKEN WORLD'S SPIDER",
          lines: [
            "Peter returns to Earth alongside Tony Stark.",
            "Instead of losing five years, Peter spends his teenage years protecting a broken city.",
            "Tony never completely gives up, working with Peter to maintain hope."
          ]
        },
        theTwist: {
          badge: "BUT THEN...",
          warning: "A HARDENED SPIDER-MAN",
          subtext: "GROWN UP TOO FAST",
          lines: [
            "Living through five years of global chaos changed Peter Parker.",
            "He is no longer just a friendly neighborhood kid.",
            "He has become a hardened commander of the street-level resistance."
          ]
        },
        alternateEnding: {
          title: "ALTERNATE ENDING",
          lines: [
            "Tony Stark kept his protege, and Peter kept his guide.",
            "Together, they held New York City through its darkest decade."
          ]
        }
      };

    case 'LOKI_SURVIVED':
      return {
        episodeTitle: "WHAT IF... LOKI SURVIVED THANOS?",
        tagline: "The God of Mischief's greatest trick.",
        theDivergence: {
          title: "WHAT CHANGED?",
          headline: "THE MOMENT THAT CHANGED EVERYTHING",
          lines: [
            "Thanos corners Loki aboard the Statesman refugee ship.",
            "Loki steps forward with his dagger, swearing undying fidelity...",
            "Thanos squeezes his neck—",
            "BUT IT DISSOLVES INTO GREEN EMERALD SMOKE."
          ]
        },
        theMoment: {
          badge: "THE MOMENT",
          action: "[ LOKI TELEPORTS WITH THE TESSERACT ]",
          lines: [
            "The choked Loki was merely an illusion.",
            "The real Loki slips away on an escape pod, carrying the Space Stone.",
            "Thanos roars in fury as his conquest is delayed."
          ]
        },
        rippleEffects: timelineData.characterChanges.map(c => ({
          character: c.name,
          original: c.original,
          thisUniverse: c.thisUniverse,
          highlight: c.highlight,
          summary: c.summary
        })),
        yearsLater: {
          badge: "YEARS LATER",
          headline: "BROTHERS UNITED AGAINST THE DARK",
          lines: [
            "Loki reaches Earth to warn Doctor Strange directly.",
            "Thor is spared the heartbreak of watching his brother murdered.",
            "The Odinson brothers fight side by side once more."
          ]
        },
        theTwist: {
          badge: "BUT THEN...",
          warning: "CAN A MISCHIEF GOD TRULY REFORM?",
          subtext: "THE SPACE STONE'S TEMPTATION",
          lines: [
            "Holding the Tesseract rekindles old ambitions within Loki.",
            "As Earth prepares for war, Loki considers building an empire of his own."
          ]
        },
        alternateEnding: {
          title: "ALTERNATE ENDING",
          lines: [
            "Loki cheated death once again.",
            "Whether as a savior or a conqueror, the universe will never be boring."
          ]
        }
      };

    case 'WANDA_JOINS_THANOS':
      return {
        episodeTitle: "WHAT IF... WANDA JOINED THANOS?",
        tagline: "When chaos magic served the Titan.",
        theDivergence: {
          title: "WHAT CHANGED?",
          headline: "THE MOMENT THAT CHANGED EVERYTHING",
          lines: [
            "In the forests of Wakanda, Thanos strides toward Vision.",
            "Wanda raises her glowing red hands to destroy the Mind Stone...",
            "Thanos looks into her grief and offers her an impossible vision of universal balance.",
            "AND WANDA LOWERS HER HANDS."
          ]
        },
        theMoment: {
          badge: "THE MOMENT",
          action: "[ WANDA ENTERS A PACT WITH THANOS ]",
          lines: [
            "Wanda willingly steps aside, allowing the Mind Stone to be claimed.",
            "In return, Thanos promises reality itself can be rewritten without pain.",
            "Her red chaos magic weaves around the Infinity Gauntlet."
          ]
        },
        rippleEffects: timelineData.characterChanges.map(c => ({
          character: c.name,
          original: c.original,
          thisUniverse: c.thisUniverse,
          highlight: c.highlight,
          summary: c.summary
        })),
        yearsLater: {
          badge: "YEARS LATER",
          headline: "THE ERA OF SCARLET WRATH",
          lines: [
            "Earth's defenders were overwhelmed by the union of Titan strength and chaos sorcery.",
            "The Avengers were dismantled completely.",
            "A restructured universe bowed to two absolute masters."
          ]
        },
        theTwist: {
          badge: "BUT THEN...",
          warning: "THE PUPPET MASTER REVEALED",
          subtext: "CHAOS CANNOT BE CONTROLLED",
          lines: [
            "Thanos believed he could command the Scarlet Witch.",
            "He was wrong.",
            "Wanda wrested the Gauntlet from his grasp, rewriting reality to her own design."
          ]
        },
        alternateEnding: {
          title: "ALTERNATE ENDING",
          lines: [
            "A reality born from grief and unbound power.",
            "Even the Watcher fears to gaze upon what she created."
          ]
        }
      };

    case 'THOR_SNAPS_ENDGAME':
      return {
        episodeTitle: "WHAT IF... THOR SNAPPED IN ENDGAME?",
        tagline: "One different choice. An entirely different universe.",
        theDivergence: {
          title: "WHAT CHANGED?",
          headline: "THE MOMENT THAT CHANGED EVERYTHING",
          lines: [
            "Thanos' army is closing in on the ruined compound.",
            "Tony reaches for the Infinity Gauntlet...",
            "But in this universe,",
            "THOR TAKES IT."
          ]
        },
        theMoment: {
          badge: "THE MOMENT",
          action: "[ THOR PERFORMS THE SNAP ]",
          lines: [
            "For one terrifying second, everything goes silent.",
            "Then... Thanos' army disappears.",
            "The Avengers win.",
            "And Thor survives the cosmic blast.",
            "That's where this universe starts to change."
          ]
        },
        rippleEffects: timelineData.characterChanges.map(c => ({
          character: c.name,
          original: c.original,
          thisUniverse: c.thisUniverse,
          highlight: c.highlight,
          summary: c.summary
        })),
        yearsLater: {
          badge: "5 YEARS LATER",
          headline: "A DIFFERENT KIND OF PEACE",
          lines: [
            "Thor carries the memory of the Snap, but his spirit is healed.",
            "Tony Stark is still alive, watching Morgan grow up.",
            "Peter Parker still has his mentor by his side.",
            "The Avengers never truly fall apart."
          ]
        },
        theTwist: {
          badge: "BUT THEN...",
          warning: "A NEW THREAT AWAKENS",
          subtext: "THIS UNIVERSE IS NO LONGER THE SAME",
          lines: [
            "The Infinity Stones left something behind in Thor's blood.",
            "Something he can feel in the quiet hours of the night.",
            "And something else in the dark corners of the universe felt it too."
          ]
        },
        alternateEnding: {
          title: "ALTERNATE ENDING",
          lines: [
            "Thor remains the protector of New Asgard.",
            "Tony becomes the Avengers' strategist.",
            "The team remains together.",
            "But somewhere beyond Earth... something is watching."
          ]
        }
      };

    default:
      // Reusable dynamic generator for any other What-If question
      const actorName = analysis.newPerformer || 'The Hero';
      return {
        episodeTitle: `WHAT IF... ${analysis.shortTitle ? analysis.shortTitle.toUpperCase() : actorName.toUpperCase() + ' CHANGED DESTINY'}?`,
        tagline: "A single decision that rippled across time.",
        theDivergence: {
          title: "WHAT CHANGED?",
          headline: "THE MOMENT THAT CHANGED EVERYTHING",
          lines: [
            `At the crucial turning point of ${analysis.targetEvent.title},`,
            `history demanded the canonical outcome.`,
            `Instead, ${actorName} defied destiny:`,
            analysis.changedAction.toUpperCase()
          ]
        },
        theMoment: {
          badge: "THE MOMENT",
          action: `[ ${actorName.toUpperCase()} REWRITES REALITY ]`,
          lines: [
            `In a blinding fraction of a second, the expected path broke apart.`,
            `The battle shifted as ${actorName} altered the timeline.`,
            `The universe branched into an uncharted future.`
          ]
        },
        rippleEffects: timelineData.characterChanges.map(c => ({
          character: c.name,
          original: c.original,
          thisUniverse: c.thisUniverse,
          highlight: c.highlight,
          summary: c.summary
        })),
        yearsLater: {
          badge: "YEARS LATER",
          headline: "THE NEW REALITY SETTLES",
          lines: [
            `The heroes build a new world upon the choices made by ${actorName}.`,
            "Alliances adapt to the new balance of power.",
            "The universe holds, but the future is forever altered."
          ]
        },
        theTwist: {
          badge: "BUT THEN...",
          warning: "AN UNFORESEEN RIPPLE",
          subtext: "THE PRICE OF DEFIANCE",
          lines: [
            "No divergence occurs in isolation.",
            "A quiet cosmic anomaly begins to spread across neighboring sectors.",
            "A new conflict brews where peace was expected."
          ]
        },
        alternateEnding: {
          title: "ALTERNATE ENDING",
          lines: [
            `${actorName} stands as the architect of this altered timeline.`,
            "A different tomorrow has begun across the multiverse."
          ]
        }
      };
  }
}

module.exports = {
  generateNarrative
};
