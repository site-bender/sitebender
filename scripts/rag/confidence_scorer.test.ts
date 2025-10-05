/**
 * Tests for Confidence Scorer
 */

import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import {
	calculateConfidence,
	categorizeRelevance,
	scoreRules,
	filterByConfidence,
	sortByConfidence,
	getHighConfidenceRules,
	getMediumConfidenceRules,
	handleLowConfidence,
	type ScoredRule
} from "./confidence_scorer.ts"
import type { Rule } from "./rule_mapper.ts"

const mockRule: Rule = {
	content: "Functions must be pure and have no side effects",
	metadata: {
		rule_id: "FP_PURE_001",
		category: "functional_programming",
		priority: 10,
		reason: "Pure functions are predictable and testable",
		consequences: "Impure functions create bugs",
		philosophy: "Functional programming principles",
		applies_to: [".ts", ".tsx"]
	}
}

Deno.test("calculateConfidence - exact keyword match", function testExactMatch() {
	const confidence = calculateConfidence(mockRule, "pure functions")
	assertEquals(confidence > 0.3, true) // Should have decent score
})

Deno.test("calculateConfidence - category match", function testCategoryMatch() {
	const confidence = calculateConfidence(mockRule, "functional programming")
	assertEquals(confidence > 0.2, true) // Category match adds 0.2
})

Deno.test("calculateConfidence - high priority boost", function testPriorityBoost() {
	const confidence = calculateConfidence(mockRule, "functions")
	assertEquals(confidence > 0, true) // Priority 10 adds 0.2
})

Deno.test("calculateConfidence - no match", function testNoMatch() {
	const confidence = calculateConfidence(mockRule, "completely unrelated query")
	assertEquals(confidence < 0.3, true) // Should have low score
})

Deno.test("categorizeRelevance - high", function testHighRelevance() {
	assertEquals(categorizeRelevance(0.9), 'high')
	assertEquals(categorizeRelevance(0.85), 'high')
})

Deno.test("categorizeRelevance - medium", function testMediumRelevance() {
	assertEquals(categorizeRelevance(0.75), 'medium')
	assertEquals(categorizeRelevance(0.65), 'medium')
})

Deno.test("categorizeRelevance - low", function testLowRelevance() {
	assertEquals(categorizeRelevance(0.5), 'low')
	assertEquals(categorizeRelevance(0.3), 'low')
})

Deno.test("scoreRules - scores array of rules", function testScoreRules() {
	const rules: ReadonlyArray<Rule> = [mockRule]
	const scored = scoreRules(rules, "pure functions")

	assertEquals(scored.length, 1)
	assertEquals(scored[0].confidence > 0, true)
	assertEquals(scored[0].relevance !== undefined, true)
})

Deno.test("filterByConfidence - filters by threshold", function testFilterByConfidence() {
	const scoredRules: ReadonlyArray<ScoredRule> = [
		{ rule: mockRule, confidence: 0.9, relevance: 'high' },
		{ rule: mockRule, confidence: 0.5, relevance: 'low' }
	]

	const filtered = filterByConfidence(scoredRules, 0.7)
	assertEquals(filtered.length, 1)
	assertEquals(filtered[0].confidence, 0.9)
})

Deno.test("sortByConfidence - sorts highest first", function testSortByConfidence() {
	const scoredRules: ReadonlyArray<ScoredRule> = [
		{ rule: mockRule, confidence: 0.5, relevance: 'low' },
		{ rule: mockRule, confidence: 0.9, relevance: 'high' },
		{ rule: mockRule, confidence: 0.7, relevance: 'medium' }
	]

	const sorted = sortByConfidence(scoredRules)
	assertEquals(sorted[0].confidence, 0.9)
	assertEquals(sorted[1].confidence, 0.7)
	assertEquals(sorted[2].confidence, 0.5)
})

Deno.test("getHighConfidenceRules - extracts high confidence", function testGetHighConfidence() {
	const scoredRules: ReadonlyArray<ScoredRule> = [
		{ rule: mockRule, confidence: 0.9, relevance: 'high' },
		{ rule: mockRule, confidence: 0.7, relevance: 'medium' },
		{ rule: mockRule, confidence: 0.5, relevance: 'low' }
	]

	const high = getHighConfidenceRules(scoredRules)
	assertEquals(high.length, 1)
})

Deno.test("getMediumConfidenceRules - extracts medium confidence", function testGetMediumConfidence() {
	const scoredRules: ReadonlyArray<ScoredRule> = [
		{ rule: mockRule, confidence: 0.9, relevance: 'high' },
		{ rule: mockRule, confidence: 0.7, relevance: 'medium' },
		{ rule: mockRule, confidence: 0.5, relevance: 'low' }
	]

	const medium = getMediumConfidenceRules(scoredRules)
	assertEquals(medium.length, 1)
})

Deno.test("handleLowConfidence - no expansion for high confidence", function testNoExpansionHigh() {
	const scoredRules: ReadonlyArray<ScoredRule> = [
		{ rule: mockRule, confidence: 0.9, relevance: 'high' }
	]

	const result = handleLowConfidence(scoredRules, "test query")
	assertEquals(result.shouldExpand, false)
	assertEquals(result.suggestions.length, 0)
})

Deno.test("handleLowConfidence - no expansion for medium confidence", function testNoExpansionMedium() {
	const scoredRules: ReadonlyArray<ScoredRule> = [
		{ rule: mockRule, confidence: 0.7, relevance: 'medium' }
	]

	const result = handleLowConfidence(scoredRules, "test query")
	assertEquals(result.shouldExpand, false)
	assertEquals(result.suggestions.length, 0)
})

Deno.test("handleLowConfidence - suggests expansion for low confidence", function testSuggestExpansion() {
	const scoredRules: ReadonlyArray<ScoredRule> = [
		{ rule: mockRule, confidence: 0.3, relevance: 'low' }
	]

	const result = handleLowConfidence(scoredRules, "error handling")
	assertEquals(result.shouldExpand, true)
	assertEquals(result.suggestions.length > 0, true)
	assertEquals(result.suggestions[0].includes('error handling'), true)
})

Deno.test("handleLowConfidence - empty rules suggests expansion", function testEmptyRulesExpansion() {
	const result = handleLowConfidence([], "test query")
	assertEquals(result.shouldExpand, true)
	assertEquals(result.suggestions.length, 4)
})
