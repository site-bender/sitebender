/**
 * Confidence Scorer
 *
 * Calculates confidence scores for rule retrievals and handles low-confidence cases.
 */

import type { Rule } from './rule_mapper.ts'

export type Relevance = 'high' | 'medium' | 'low'

export type ScoredRule = {
	rule: Rule
	confidence: number  // 0.0 - 1.0
	relevance: Relevance
}

/**
 * Calculates confidence score for a rule based on query match.
 * Score is between 0.0 and 1.0.
 */
export function calculateConfidence(rule: Rule, query: string): number {
	let score = 0.0

	const queryLower = query.toLowerCase()
	const queryWords = queryLower.split(/\s+/)
	const contentLower = rule.content.toLowerCase()
	const contentWords = contentLower.split(/\s+/)

	// Exact keyword match in content (40% weight)
	const matches = queryWords.filter(
		function isWordInContent(word: string): boolean {
			return contentWords.includes(word)
		}
	)
	score += (matches.length / queryWords.length) * 0.4

	// Category match (20% weight)
	if (queryLower.includes(rule.metadata.category)) {
		score += 0.2
	}

	// Priority boost (20% weight)
	score += (rule.metadata.priority / 10) * 0.2

	// Rule ID keyword match (10% weight)
	if (queryLower.includes(rule.metadata.rule_id.toLowerCase())) {
		score += 0.1
	}

	// Philosophy/reason match (10% weight)
	const philosophyLower = rule.metadata.philosophy?.toLowerCase() || ''
	const reasonLower = rule.metadata.reason?.toLowerCase() || ''
	const hasPhilosophyMatch = queryWords.some(
		function isInPhilosophy(word: string): boolean {
			return philosophyLower.includes(word) || reasonLower.includes(word)
		}
	)
	if (hasPhilosophyMatch) {
		score += 0.1
	}

	return Math.min(score, 1.0)
}

/**
 * Categorizes confidence score into relevance level.
 */
export function categorizeRelevance(confidence: number): Relevance {
	if (confidence >= 0.85) {
		return 'high'
	}
	if (confidence >= 0.65) {
		return 'medium'
	}
	return 'low'
}

/**
 * Scores an array of rules against a query.
 */
export function scoreRules(
	rules: ReadonlyArray<Rule>,
	query: string
): ReadonlyArray<ScoredRule> {
	return rules.map(
		function scoreRule(rule: Rule): ScoredRule {
			const confidence = calculateConfidence(rule, query)
			const relevance = categorizeRelevance(confidence)

			return { rule, confidence, relevance }
		}
	)
}

/**
 * Filters rules by minimum confidence threshold.
 */
export function filterByConfidence(
	scoredRules: ReadonlyArray<ScoredRule>,
	minConfidence: number
): ReadonlyArray<ScoredRule> {
	return scoredRules.filter(
		function meetsThreshold(sr: ScoredRule): boolean {
			return sr.confidence >= minConfidence
		}
	)
}

/**
 * Sorts rules by confidence score (highest first).
 */
export function sortByConfidence(
	scoredRules: ReadonlyArray<ScoredRule>
): ReadonlyArray<ScoredRule> {
	return [...scoredRules].sort(
		function compareConfidence(a: ScoredRule, b: ScoredRule): number {
			return b.confidence - a.confidence
		}
	)
}

/**
 * Gets high confidence rules (>0.85).
 */
export function getHighConfidenceRules(
	scoredRules: ReadonlyArray<ScoredRule>
): ReadonlyArray<Rule> {
	return scoredRules
		.filter(function isHighConfidence(sr: ScoredRule): boolean {
			return sr.relevance === 'high'
		})
		.map(function extractRule(sr: ScoredRule): Rule {
			return sr.rule
		})
}

/**
 * Gets medium confidence rules (0.65-0.85).
 */
export function getMediumConfidenceRules(
	scoredRules: ReadonlyArray<ScoredRule>
): ReadonlyArray<Rule> {
	return scoredRules
		.filter(function isMediumConfidence(sr: ScoredRule): boolean {
			return sr.relevance === 'medium'
		})
		.map(function extractRule(sr: ScoredRule): Rule {
			return sr.rule
		})
}

/**
 * Handles low confidence scenario by suggesting query expansion.
 */
export function handleLowConfidence(
	scoredRules: ReadonlyArray<ScoredRule>,
	originalQuery: string
): {
	shouldExpand: boolean
	suggestions: ReadonlyArray<string>
} {
	const highConfidence = getHighConfidenceRules(scoredRules)

	if (highConfidence.length > 0) {
		return { shouldExpand: false, suggestions: [] }
	}

	const mediumConfidence = getMediumConfidenceRules(scoredRules)

	if (mediumConfidence.length > 0) {
		return { shouldExpand: false, suggestions: [] }
	}

	// Low confidence - suggest query expansion
	return {
		shouldExpand: true,
		suggestions: [
			`${originalQuery} patterns`,
			`${originalQuery} examples`,
			`${originalQuery} best practices`,
			`how to ${originalQuery}`
		]
	}
}
