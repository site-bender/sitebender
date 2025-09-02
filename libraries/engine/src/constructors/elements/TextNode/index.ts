import type {
	TextNodeConfig,
	TextNodeConstructor,
} from "@adaptiveSrc/constructors/elements/types/index.ts"

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
export const TextNode: TextNodeConstructor = (content): TextNodeConfig => ({
	content: typeof content === "string" ? content : "",
	tag: "TextNode",
})

export default TextNode
