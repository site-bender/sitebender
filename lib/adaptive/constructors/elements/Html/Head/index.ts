import type { HeadAttributes } from "../../../../constructors/elements/types/attributes/index.ts"
import type {
	ElementAttributes,
	ElementConfig,
} from "../../../../constructors/elements/types/index.ts"

import GlobalOnly from "../../../../constructors/abstracted/GlobalOnly/index.ts"
import isMetadataContent from "../../../../guards/isMetadataContent/index.ts"

/**
 * Child filter that validates metadata content
 */
const metadataContentFilter = (child: unknown): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !("tag" in child)) {
		return true
	}

	// For element configs, check if they're valid metadata content
	return isMetadataContent(child)
}

/**
 * Creates a Head element configuration object
 *
 * The head element represents a collection of metadata for the document.
 * It can only contain metadata content (title, meta, link, style, script, etc.).
 *
 * @example
 * ```typescript
 * const head = Head({
 *   id: "document-head"
 * })([
 *   Title()("Page Title"),
 *   Meta({ charset: "utf-8" }),
 *   Link({ rel: "stylesheet", href: "styles.css" })
 * ])
 * ```
 */
export const Head: (
	attributes: ElementAttributes<HeadAttributes>,
) => (children: Array<unknown>) => ElementConfig<HeadAttributes> = GlobalOnly<
	HeadAttributes
>("Head")(metadataContentFilter)

export default Head
