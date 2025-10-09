/**
 * Tests for Rule Mapper
 */

import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import {
	deduplicateRules,
	formatRulesForContext,
	getRuleSetsForTask,
	type Rule,
} from "./rule_mapper.ts"

Deno.test("getRuleSetsForTask - error handling", function testErrorHandlingRules() {
	const ruleSets = getRuleSetsForTask("error-handling")
	assertEquals(ruleSets.length > 0, true)
	assertEquals(
		ruleSets.some(function checkServer(rs) {
			return rs.server === "functional_programming_rules"
		}),
		true,
	)
})

Deno.test("getRuleSetsForTask - type definition", function testTypeDefinitionRules() {
	const ruleSets = getRuleSetsForTask("type-definition")
	assertEquals(ruleSets.length > 0, true)
	assertEquals(
		ruleSets.some(function checkServer(rs) {
			return rs.server === "typescript_rules"
		}),
		true,
	)
})

Deno.test("getRuleSetsForTask - component", function testComponentRules() {
	const ruleSets = getRuleSetsForTask("component")
	assertEquals(ruleSets.length > 0, true)
	assertEquals(
		ruleSets.some(function checkServer(rs) {
			return rs.server === "jsx_rules"
		}),
		true,
	)
	assertEquals(
		ruleSets.some(function checkServer(rs) {
			return rs.server === "accessibility_rules"
		}),
		true,
	)
})

Deno.test("formatRulesForContext - empty array", function testFormatEmpty() {
	const formatted = formatRulesForContext([])
	assertEquals(formatted, "No specific rules retrieved.")
})

Deno.test("formatRulesForContext - with rules", function testFormatWithRules() {
	const rules: ReadonlyArray<Rule> = [
		{
			content: "Test rule content",
			metadata: {
				rule_id: "TEST_001",
				category: "test_category",
				priority: 10,
				reason: "Test reason",
				consequences: "Test consequences",
				philosophy: "Test philosophy",
				examples: {
					correct: "correct example",
					wrong: "wrong example",
				},
				applies_to: [".ts"],
			},
		},
	]

	const formatted = formatRulesForContext(rules)
	assertEquals(formatted.includes("TEST_CATEGORY"), true)
	assertEquals(formatted.includes("Test rule content"), true)
	assertEquals(formatted.includes("Test reason"), true)
	assertEquals(formatted.includes("correct example"), true)
	assertEquals(formatted.includes("wrong example"), true)
})

Deno.test("deduplicateRules - removes duplicates", function testDeduplicate() {
	const rules: ReadonlyArray<Rule> = [
		{
			content: "Rule 1",
			metadata: {
				rule_id: "RULE_001",
				category: "test",
				priority: 10,
				reason: "reason",
				consequences: "consequences",
				philosophy: "philosophy",
				applies_to: [".ts"],
			},
		},
		{
			content: "Rule 1 duplicate",
			metadata: {
				rule_id: "RULE_001",
				category: "test",
				priority: 10,
				reason: "reason",
				consequences: "consequences",
				philosophy: "philosophy",
				applies_to: [".ts"],
			},
		},
		{
			content: "Rule 2",
			metadata: {
				rule_id: "RULE_002",
				category: "test",
				priority: 10,
				reason: "reason",
				consequences: "consequences",
				philosophy: "philosophy",
				applies_to: [".ts"],
			},
		},
	]

	const deduplicated = deduplicateRules(rules)
	assertEquals(deduplicated.length, 2)
	assertEquals(deduplicated[0].metadata.rule_id, "RULE_001")
	assertEquals(deduplicated[1].metadata.rule_id, "RULE_002")
})

Deno.test("deduplicateRules - keeps first occurrence", function testDeduplicateKeepsFirst() {
	const rules: ReadonlyArray<Rule> = [
		{
			content: "First occurrence",
			metadata: {
				rule_id: "RULE_001",
				category: "test",
				priority: 10,
				reason: "reason",
				consequences: "consequences",
				philosophy: "philosophy",
				applies_to: [".ts"],
			},
		},
		{
			content: "Second occurrence",
			metadata: {
				rule_id: "RULE_001",
				category: "test",
				priority: 10,
				reason: "reason",
				consequences: "consequences",
				philosophy: "philosophy",
				applies_to: [".ts"],
			},
		},
	]

	const deduplicated = deduplicateRules(rules)
	assertEquals(deduplicated.length, 1)
	assertEquals(deduplicated[0].content, "First occurrence")
})
