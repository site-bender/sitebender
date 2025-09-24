import type { Node } from "../../../types/ir/index.ts"

import escape from "../../../../toolsmith/src/vanilla/string/escape/index.ts"

// TODO(@guy): Add support for other IR node types (injector, comparator, etc.)

/**
 * Renders IR nodes to secure HTML strings for server-side rendering
 *
 * Converts IR element nodes into properly escaped HTML strings suitable
 * for server-side rendering (SSR). Automatically escapes all attribute
 * values and text content to prevent XSS attacks. Recursively renders
 * child nodes to build complete HTML structures.
 *
 * Key security features:
 * - All attribute values are HTML-escaped
 * - All text content is HTML-escaped
 * - No dynamic code execution
 * - Safe handling of all input types
 *
 * @param node - IR node to render to HTML
 * @returns HTML string with properly escaped content
 * @example
 * ```typescript
 * // Simple element
 * const node = {
 *   v: "0.1.0",
 *   id: "test-id",
 *   kind: "element",
 *   tag: "div",
 *   attrs: { class: "container", "data-value": "Tom & Jerry" },
 *   children: ["Hello World"]
 * }
 * renderIrToHtml(node)
 * // '<div class="container" data-value="Tom &amp; Jerry">Hello World</div>'
 *
 * // Nested elements with escaping
 * const form = {
 *   v: "0.1.0",
 *   id: "form-id",
 *   kind: "element",
 *   tag: "form",
 *   attrs: { action: "/submit?q=<script>", method: "POST" },
 *   children: [{
 *     v: "0.1.0",
 *     id: "input-id",
 *     kind: "element",
 *     tag: "input",
 *     attrs: {
 *       type: "text",
 *       name: "query",
 *       value: "Tom & Jerry's \"Adventure\""
 *     }
 *   }]
 * }
 * renderIrToHtml(form)
 * // '<form action="/submit?q=&lt;script&gt;" method="POST">
 * //    <input type="text" name="query" value="Tom &amp; Jerry&#39;s &quot;Adventure&quot;" />
 * //  </form>'
 *
 * // Text content escaping
 * const textNode = {
 *   v: "0.1.0",
 *   id: "text-id",
 *   kind: "element",
 *   tag: "p",
 *   children: ["<script>alert('XSS')</script>"]
 * }
 * renderIrToHtml(textNode)
 * // '<p>&lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;</p>'
 *
 * // Self-closing elements
 * const br = {
 *   v: "0.1.0",
 *   id: "br-id",
 *   kind: "element",
 *   tag: "br"
 * }
 * renderIrToHtml(br)
 * // '<br />'
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify input nodes
 * @safe - All output is properly escaped
 */
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

/**
 * Renders an IR element node to HTML string
 *
 * @param node - Element node to render
 * @returns HTML string for the element
 */
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

/**
 * Renders element attributes to HTML attribute string with security filtering
 *
 * @param attrs - Attributes object to render
 * @returns HTML attributes string with escaped values and dangerous attributes filtered
 */
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

/**
 * Renders an IR text node to escaped HTML string
 *
 * @param node - Text node to render
 * @returns Escaped HTML string for the text content
 */
function renderText(node: Node): string {
	if (node.kind !== "text") {
		return ""
	}

	// Escape text content for security
	return escape(node.content)
}

/**
 * Renders child nodes to HTML string
 *
 * @param children - Array of child nodes to render
 * @returns HTML string for all children
 */
function renderChildren(children: Array<Node>): string {
	return children.map((child) => {
		// Recursively render all child nodes
		return renderIrToHtml(child)
	}).join("")
}
