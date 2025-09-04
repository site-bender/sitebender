import type { TextNodeConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

/**
 * Creates a TextNode configuration object for representing text content
 *
 * @param content - The text content (will be converted to string, non-strings become empty string)
 * @returns Configuration object with tag "TextNode" and string content
 *
 * @example
 * ```typescript
 * const textNode = TextNode("Hello, World!")
 * // Returns: { tag: "TextNode", content: "Hello, World!" }
 * ```
 */
export default function TextNode(content: unknown): TextNodeConfig {
	return {
		content: typeof content === "string" ? content : "",
		tag: "TextNode",
	}
}
