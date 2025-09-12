//++ Generates human-readable documentation from any library's contract.json

import type { Section } from "./section/index.ts"

import formatFunction from "./formatFunction/index.ts"
import formatType from "./formatType/index.ts"
import section from "./section/index.ts"
import subsection from "./subsection/index.ts"

type Contract = {
	version: string
	lastUpdated: string
	library: string
	purpose: string
	api: {
		exports: Array<{
			name: string
			signature: string
			description: string
		}>
		types: Array<{
			name: string
			description: string
			fields?: Array<string>
			note?: string
		}>
	}
	responsibilities?: {
		owns?: Array<string>
		provides?: Array<string>
		consumes?: Array<string>
		forbidden?: Array<string>
	}
	implementation?: {
		allowed?: Array<string>
		forbidden?: Array<string>
	}
	output?: {
		requirements?: Array<string>
		validation?: {
			"compile-time"?: Array<string>
			runtime?: Array<string>
			"test-time"?: Array<string>
		}
	}
	input?: {
		requirements?: Array<string>
		validation?: {
			"compile-time"?: Array<string>
			runtime?: Array<string>
			"test-time"?: Array<string>
		}
	}
	consumers?: {
		allowed?: Array<string>
		forbidden?: Array<string>
	}
	dependencies?: {
		allowed?: Array<string>
		forbidden?: Array<string>
	}
	commentSyntax?: Record<string, string>
	versioning?: {
		strategy: string
		"breaking-changes": string
		deprecation: string
	}
}

export default function generateContractDoc(contract: Contract): string {
	const libraryName = contract.library.charAt(0).toUpperCase() +
		contract.library.slice(1)

	const sections: Array<Section> = [
		// Header
		[
			`# ${libraryName} Library Contract v${contract.version}`,
			"",
			`> Last Updated: ${contract.lastUpdated}`,
			"",
		],

		// Purpose
		section("## Purpose", [contract.purpose]),

		// API
		section("## Public API", []),
		subsection("### Exported Functions", [], ""),
		...contract.api.exports.map(formatFunction),

		// Types
		subsection("### Exported Types", [], ""),
		...contract.api.types.map(formatType),
	]

	// Responsibilities (Parser style)
	if (contract.responsibilities) {
		sections.push(section("## Responsibilities", []))

		if (contract.responsibilities.owns) {
			sections.push(
				subsection(`### ${libraryName} Owns`, contract.responsibilities.owns),
			)
		}
		if (contract.responsibilities.provides) {
			sections.push(
				subsection(
					`### ${libraryName} Provides`,
					contract.responsibilities.provides,
				),
			)
		}
		if (contract.responsibilities.consumes) {
			sections.push(
				subsection(
					`### ${libraryName} Consumes`,
					contract.responsibilities.consumes,
				),
			)
		}
		if (contract.responsibilities.forbidden) {
			sections.push(
				subsection(
					`### ${libraryName} Must Never`,
					contract.responsibilities.forbidden,
					"- ❌ ",
				),
			)
		}
	}

	// Implementation
	if (contract.implementation) {
		sections.push(section("## Implementation Rules", []))

		if (contract.implementation.allowed) {
			const title = contract.library === "parser"
				? "### Allowed Internal Operations"
				: "### Allowed Operations"
			sections.push(subsection(title, contract.implementation.allowed, "- ✅ "))
		}
		if (contract.implementation.forbidden) {
			const title = contract.library === "parser"
				? "### Forbidden Exports"
				: "### Forbidden Operations"
			sections.push(
				subsection(title, contract.implementation.forbidden, "- ❌ "),
			)
		}
	}

	// Output Requirements (Parser style)
	if (contract.output?.requirements) {
		sections.push(
			section("## Output Requirements", [
				`Every output from ${libraryName} must:`,
			]),
		)
		sections.push(subsection("", contract.output.requirements))
	}

	// Input Requirements (Envoy style)
	if (contract.input?.requirements) {
		sections.push(
			section("## Input Requirements", [`Every input to ${libraryName} must:`]),
		)
		sections.push(subsection("", contract.input.requirements))
	}

	// Validation
	const validation = contract.output?.validation || contract.input?.validation
	if (validation) {
		sections.push(section("## Validation Layers", []))

		if (validation["compile-time"]) {
			sections.push(
				subsection("### Compile-Time Validation", validation["compile-time"]),
			)
		}
		if (validation.runtime) {
			sections.push(subsection("### Runtime Validation", validation.runtime))
		}
		if (validation["test-time"]) {
			sections.push(
				subsection("### Test-Time Validation", validation["test-time"]),
			)
		}
	}

	// Consumers (Parser style)
	if (contract.consumers) {
		sections.push(section("## Authorized Consumers", []))

		if (contract.consumers.allowed) {
			sections.push(
				subsection(
					`### Allowed to consume ${libraryName} output:`,
					contract.consumers.allowed,
					"- ✅ ",
				),
			)
		}
		if (contract.consumers.forbidden) {
			sections.push(
				subsection(
					`### Forbidden from consuming ${libraryName} output:`,
					contract.consumers.forbidden,
					"- ❌ ",
				),
			)
		}
	}

	// Dependencies (Envoy style)
	if (contract.dependencies) {
		sections.push(section("## Dependencies", []))

		if (contract.dependencies.allowed) {
			sections.push(
				subsection(
					"### Allowed dependencies:",
					contract.dependencies.allowed,
					"- ✅ ",
				),
			)
		}
		if (contract.dependencies.forbidden) {
			sections.push(
				subsection(
					"### Forbidden dependencies:",
					contract.dependencies.forbidden,
					"- ❌ ",
				),
			)
		}
	}

	// Comment Syntax (Envoy specific)
	if (contract.commentSyntax) {
		sections.push([
			"### Comment Syntax",
			"",
			"Envoy interprets these comment patterns:",
			"",
			...Object.entries(contract.commentSyntax).map(([pattern, meaning]) =>
				`- \`${pattern}\` - ${meaning}`
			),
			"",
		])
	}

	// Footer
	sections.push([
		"---",
		"",
		"**This document is auto-generated from contract.json. DO NOT EDIT DIRECTLY.**",
	])

	return sections.flat().join("\n")
}
