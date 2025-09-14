//++ Generates human-readable documentation from any library's contract.json

import type { Section } from "./section/index.ts"

import join from "@sitebender/toolkit/vanilla/array/join/index.ts"
import map from "@sitebender/toolkit/vanilla/array/map/index.ts"
import slice from "@sitebender/toolkit/vanilla/string/slice/index.ts"

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
		slice(contract.library, 1)

	let sections: Array<Section> = [
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
		...map(contract.api.exports, formatFunction),

		// Types
		subsection("### Exported Types", [], ""),
		...map(contract.api.types, formatType),
	]

	// Responsibilities (Parser style)
	if (contract.responsibilities) {
		sections = [...sections, section("## Responsibilities", [])]

		if (contract.responsibilities.owns) {
			sections = [...sections,
				subsection(`### ${libraryName} Owns`, contract.responsibilities.owns),
			]
		}
		if (contract.responsibilities.provides) {
			sections = [...sections,
				subsection(
					`### ${libraryName} Provides`,
					contract.responsibilities.provides,
				),
			]
		}
		if (contract.responsibilities.consumes) {
			sections = [...sections,
				subsection(
					`### ${libraryName} Consumes`,
					contract.responsibilities.consumes,
				),
			]
		}
		if (contract.responsibilities.forbidden) {
			sections = [...sections,
				subsection(
					`### ${libraryName} Must Never`,
					contract.responsibilities.forbidden,
					"- ❌ ",
				),
			]
		}
	}

	// Implementation
	if (contract.implementation) {
		sections = [...sections, section("## Implementation Rules", [])]

		if (contract.implementation.allowed) {
			const title = contract.library === "parser"
				? "### Allowed Internal Operations"
				: "### Allowed Operations"
			sections = [...sections, subsection(title, contract.implementation.allowed, "- ✅ ")]
		}
		if (contract.implementation.forbidden) {
			const title = contract.library === "parser"
				? "### Forbidden Exports"
				: "### Forbidden Operations"
			sections = [...sections,
				subsection(title, contract.implementation.forbidden, "- ❌ "),
			]
		}
	}

	// Output Requirements (Parser style)
	if (contract.output?.requirements) {
		sections = [...sections,
			section("## Output Requirements", [
				`Every output from ${libraryName} must:`,
			]),
		]
		sections = [...sections, subsection("", contract.output.requirements)]
	}

	// Input Requirements (Envoy style)
	if (contract.input?.requirements) {
		sections = [...sections,
			section("## Input Requirements", [`Every input to ${libraryName} must:`]),
		]
		sections = [...sections, subsection("", contract.input.requirements)]
	}

	// Validation
	const validation = contract.output?.validation || contract.input?.validation
	if (validation) {
		sections = [...sections, section("## Validation Layers", [])]

		if (validation["compile-time"]) {
			sections = [...sections,
				subsection("### Compile-Time Validation", validation["compile-time"]),
			]
		}
		if (validation.runtime) {
			sections = [...sections, subsection("### Runtime Validation", validation.runtime)]
		}
		if (validation["test-time"]) {
			sections = [...sections,
				subsection("### Test-Time Validation", validation["test-time"]),
			]
		}
	}

	// Consumers (Parser style)
	if (contract.consumers) {
		sections = [...sections, section("## Authorized Consumers", [])]

		if (contract.consumers.allowed) {
			sections = [...sections,
				subsection(
					`### Allowed to consume ${libraryName} output:`,
					contract.consumers.allowed,
					"- ✅ ",
				),
			]
		}
		if (contract.consumers.forbidden) {
			sections = [...sections,
				subsection(
					`### Forbidden from consuming ${libraryName} output:`,
					contract.consumers.forbidden,
					"- ❌ ",
				),
			]
		}
	}

	// Dependencies (Envoy style)
	if (contract.dependencies) {
		sections = [...sections, section("## Dependencies", [])]

		if (contract.dependencies.allowed) {
			sections = [...sections,
				subsection(
					"### Allowed dependencies:",
					contract.dependencies.allowed,
					"- ✅ ",
				),
			]
		}
		if (contract.dependencies.forbidden) {
			sections = [...sections,
				subsection(
					"### Forbidden dependencies:",
					contract.dependencies.forbidden,
					"- ❌ ",
				),
			]
		}
	}

	// Comment Syntax (Envoy specific)
	if (contract.commentSyntax) {
		sections = [...sections, [
			"### Comment Syntax",
			"",
			"Envoy interprets these comment patterns:",
			"",
			...map(Object.entries(contract.commentSyntax), ([pattern, meaning]) =>
				`- \`${pattern}\` - ${meaning}`
			),
			"",
		]]
	}

	// Footer
	sections = [...sections, [
		"---",
		"",
		"**This document is auto-generated from contract.json. DO NOT EDIT DIRECTLY.**",
	]]

	return join(sections.flat(), "\n")
}
