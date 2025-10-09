/**
 * Rule Mapper
 *
 * Maps task types to relevant MCP server rules that should be retrieved
 * before code generation.
 */

import type { TaskType } from "./task_detector.ts"

export type RuleSet = {
	server: string
	queries: ReadonlyArray<string>
}

export type Rule = {
	content: string
	metadata: {
		rule_id: string
		category: string
		priority: number
		reason: string
		consequences: string
		philosophy: string
		examples?: {
			correct?: string
			wrong?: string
			anti_pattern?: string
		}
		applies_to: ReadonlyArray<string>
	}
}

/**
 * Maps task types to the MCP servers and queries that should be used
 * to retrieve relevant rules.
 */
export const TASK_TO_RULES: Readonly<Record<TaskType, ReadonlyArray<RuleSet>>> =
	{
		"error-handling": [
			{
				server: "functional_programming_rules",
				queries: ["Result monad", "Validation monad", "error handling"],
			},
			{
				server: "typescript_rules",
				queries: ["discriminated unions", "error types"],
			},
		],
		"type-definition": [
			{
				server: "typescript_rules",
				queries: [
					"branded types",
					"discriminated unions",
					"type-level programming",
				],
			},
			{
				server: "syntax_rules",
				queries: ["naming conventions", "type naming"],
			},
		],
		"testing": [
			{
				server: "functional_programming_rules",
				queries: ["pure functions", "property testing"],
			},
		],
		"async-operation": [
			{
				server: "functional_programming_rules",
				queries: ["Promise Result", "async error handling"],
			},
			{
				server: "typescript_rules",
				queries: ["async types"],
			},
		],
		"validation": [
			{
				server: "functional_programming_rules",
				queries: ["Validation monad", "smart constructors"],
			},
		],
		"file-operation": [
			{
				server: "functional_programming_rules",
				queries: ["IO boundaries", "effect runners"],
			},
		],
		"component": [
			{
				server: "jsx_rules",
				queries: ["component design", "data-as-configuration"],
			},
			{
				server: "accessibility_rules",
				queries: ["semantic components", "progressive enhancement"],
			},
		],
		"general": [
			{
				server: "syntax_rules",
				queries: ["naming", "function declarations"],
			},
			{
				server: "formatting_rules",
				queries: ["code style"],
			},
		],
	}

/**
 * Gets the rule sets that should be queried for a given task type.
 */
export function getRuleSetsForTask(taskType: TaskType): ReadonlyArray<RuleSet> {
	return TASK_TO_RULES[taskType]
}

/**
 * Formats rules for injection into AI context.
 * Groups rules by category and formats them clearly.
 */
export function formatRulesForContext(rules: ReadonlyArray<Rule>): string {
	if (rules.length === 0) {
		return "No specific rules retrieved."
	}

	const rulesByCategory = rules.reduce(
		function groupByCategory(
			acc: Record<string, Array<Rule>>,
			rule: Rule,
		): Record<string, Array<Rule>> {
			const category = rule.metadata.category

			if (!acc[category]) {
				acc[category] = []
			}

			acc[category].push(rule)

			return acc
		},
		{} as Record<string, Array<Rule>>,
	)

	const sections = Object.entries(rulesByCategory).map(
		function formatCategory([category, categoryRules]): string {
			const rulesText = categoryRules.map(
				function formatRule(rule: Rule): string {
					const examples = rule.metadata.examples
					const exampleText = examples?.correct
						? `\n   ✅ Correct: ${examples.correct}`
						: ""
					const wrongText = examples?.wrong || examples?.anti_pattern
						? `\n   ❌ Wrong: ${examples.wrong || examples.anti_pattern}`
						: ""

					return `
- ${rule.content}
  Reason: ${rule.metadata.reason}
  ${exampleText}${wrongText}`
				},
			).join("\n")

			return `
### ${category.toUpperCase()}
${rulesText}`
		},
	).join("\n")

	return sections
}

/**
 * Deduplicates rules by rule_id, keeping the first occurrence.
 */
export function deduplicateRules(
	rules: ReadonlyArray<Rule>,
): ReadonlyArray<Rule> {
	const seen = new Set<string>()
	const unique: Array<Rule> = []

	for (const rule of rules) {
		if (!seen.has(rule.metadata.rule_id)) {
			seen.add(rule.metadata.rule_id)
			unique.push(rule)
		}
	}

	return unique
}
