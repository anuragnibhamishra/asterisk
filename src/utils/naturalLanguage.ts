import type { NaturalLanguageInput, ParsedProblemPlaceholder } from '../types';

/**
 * Placeholder for future NLP/LLM integration.
 * V1 does not parse natural language — this module defines the interface
 * so a parser can be plugged in without modifying the math engine.
 */
export function parseNaturalLanguage(_input: NaturalLanguageInput): ParsedProblemPlaceholder {
  return {
    status: 'not-implemented',
    message:
      'Natural language parsing is not available yet. Use the structured solver above, or check back when NLP integration is enabled.',
  };
}
