import type { Node } from "../../../types/ir/index.ts"

import escape from "../../../../toolsmith/src/vanilla/string/escape/index.ts"

// TODO(@guy): Add support for other IR node types (injector, comparator, etc.)

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function renderIrToHtml(node: Node): string {
	// Handle different IR node types
	if (node.kind === "element") {
		return renderElement(node)
	}

	if (node.kind === "text") {
		return renderText(node)
	}

	// For other node types, return empty string for now
	// TODO(@guy): Add support for other IR node types (injector, comparator, etc.)
	return ""
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function renderElement(node: Node): string {
	if (node.kind !== "element") {
		return ""
	}

	const tag = node.tag.toLowerCase()
	const attributes = renderAttributes(node.attrs || {})
	const children = renderChildren(node.children || [])

	// Handle self-closing elements
	const voidElements = new Set([
		"area",
		"base",
		"br",
		"col",
		"embed",
		"hr",
		"img",
		"input",
		"link",
		"meta",
		"source",
		"track",
		"wbr",
	])

	if (voidElements.has(tag)) {
		return `<${tag}${attributes} />`
	}

	return `<${tag}${attributes}>${children}</${tag}>`
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function renderAttributes(attrs: Record<string, unknown>): string {
	const attributePairs = Object.entries(attrs)
		.filter(([_, value]) => value !== null && value !== undefined)
		.map(([key, value]) => {
			const stringValue = String(value)

			// Security: Filter dangerous attribute values
			if (
				key.toLowerCase().startsWith("on") ||
				stringValue.toLowerCase().includes("javascript:")
			) {
				return null // Remove dangerous event handlers and javascript: URLs
			}

			// Escape the attribute value for security
			const escapedValue = escape(stringValue)
			return `${key}="${escapedValue}"`
		})
		.filter((attr) => attr !== null) // Remove filtered attributes

	return attributePairs.length > 0 ? ` ${attributePairs.join(" ")}` : ""
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function renderText(node: Node): string {
	if (node.kind !== "text") {
		return ""
	}

	// Escape text content for security
	return escape(node.content)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function renderChildren(children: Array<Node>): string {
	return children.map((child) => {
		// Recursively render all child nodes
		return renderIrToHtml(child)
	}).join("")
}
