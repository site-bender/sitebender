import type { ElementConfig } from "../../types/index.ts"
import type { BaseProps } from "../types/index.ts"

import includes from "@sitebender/toolsmith/array/includes/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import entries from "@sitebender/toolsmith/object/entries/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import isNotEmpty from "@sitebender/toolsmith/array/isNotEmpty/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import _Head from "./_Head/index.ts"
import _Body from "./_Body/index.ts"

import _isHeadElement from "./_isHeadElement/index.ts"
import _isBodyElement from "./_isBodyElement/index.ts"
import _isOrphanedChild from "./_isOrphanedChild/index.ts"
import _isHeadContentElement from "./_isHeadContentElement/index.ts"
import _isBodyContentElement from "./_isBodyContentElement/index.ts"

import {
	GLOBAL_ATTRIBUTES,
	VALID_DIR_VALUES,
	VALID_HTML_ATTRIBUTES,
} from "../constants/index.ts"

type Props =
	& BaseProps
	& Readonly<{
		xmlns?: string // XHTML namespace (rarely used)
	}>

/*++
 + Private HTML element wrapper component
 + Validates structure, attributes, and descendants per HTML spec
 + Ensures head comes before body
 + Moves misplaced children to appropriate locations
 */
export default function _Html(props: Props): ElementConfig {
	const children = props.children || []

	/*++
	 + Step 1: Extract HEAD and BODY elements from children
	 */
	const headElementsResult = filter(_isHeadElement)(
		children as ReadonlyArray<unknown>,
	)
	const headElements = getOrElse([] as ReadonlyArray<ElementConfig>)(
		headElementsResult,
	) as ReadonlyArray<ElementConfig>

	const bodyElementsResult = filter(_isBodyElement)(
		children as ReadonlyArray<unknown>,
	)
	const bodyElements = getOrElse([] as ReadonlyArray<ElementConfig>)(
		bodyElementsResult,
	) as ReadonlyArray<ElementConfig>

	/*++
	 + Step 2: Get orphaned children (not in HEAD or BODY wrappers)
	 */
	const orphanedChildrenResult = filter(_isOrphanedChild)(
		children as ReadonlyArray<unknown>,
	)
	const orphanedChildren = getOrElse([] as ReadonlyArray<ElementConfig>)(
		orphanedChildrenResult,
	) as ReadonlyArray<ElementConfig>

	/*++
	 + Step 3: Separate orphaned children into head vs body content
	 */
	const orphanedHeadElementsResult = filter(_isHeadContentElement)(
		orphanedChildren,
	)
	const orphanedHeadElements = getOrElse([] as ReadonlyArray<ElementConfig>)(
		orphanedHeadElementsResult,
	) as ReadonlyArray<ElementConfig>

	const orphanedBodyElementsResult = filter(_isBodyContentElement)(
		orphanedChildren,
	)
	const orphanedBodyElements = getOrElse([] as ReadonlyArray<ElementConfig>)(
		orphanedBodyElementsResult,
	) as ReadonlyArray<ElementConfig>

	/*++
	 + Step 4: Create or use existing HEAD
	 */
	const existingHead = isNotEmpty(headElements) ? headElements[0] : null

	const headChildren = existingHead && existingHead._tag === "element"
		? [...existingHead.children, ...orphanedHeadElements]
		: orphanedHeadElements

	const head = _Head({ children: headChildren })

	/*++
	 + Step 5: Create or use existing BODY
	 + Wrap orphaned body elements in MAIN
	 */
	const existingBody = isNotEmpty(bodyElements) ? bodyElements[0] : null

	const bodyChildren = existingBody && existingBody._tag === "element"
		? existingBody.children
		: []

	/*++
	 + If there are orphaned body elements, wrap them in MAIN
	 */
	const mainElement: ElementConfig | null = isNotEmpty(orphanedBodyElements)
		? {
			_tag: "element" as const,
			tagName: "MAIN",
			attributes: {},
			children: orphanedBodyElements,
		}
		: null

	const finalBodyChildren = mainElement
		? [...bodyChildren, mainElement]
		: bodyChildren

	const body = _Body({ children: finalBodyChildren })

	/*++
	 + Step 6: Validate and process attributes
	 */
	const attributeEntries = entries(props)

	/*++
	 + [EXCEPTION] Uncurried function for use with reduce
	 */
	function processAttribute(
		accumulator: Readonly<Record<string, string>>,
		entry: readonly [string, unknown],
	): Readonly<Record<string, string>> {
		const [key, value] = entry

		/*++
		 + Skip children (not an attribute)
		 */
		if (key === "children") {
			return accumulator
		}

		/*++
		 + Preserve data-* and aria-* attributes
		 */
		if (key.startsWith("data-") || key.startsWith("aria-")) {
			return {
				...accumulator,
				[key]: String(value),
			}
		}

		/*++
		 + Validate dir attribute value if present
		 */
		if (key === "dir") {
			if (includes(VALID_DIR_VALUES)(value)) {
				return {
					...accumulator,
					dir: String(value),
				}
			}
			/*++
			 + Invalid dir value → add error metadata
			 */
			return {
				...accumulator,
				"data-§-error": "Invalid dir value",
				"data-§-original-value": String(value),
			}
		}

		/*++
		 + Preserve global attributes and valid HTML-specific attributes
		 */
		if (
			includes(GLOBAL_ATTRIBUTES)(key) ||
			includes(VALID_HTML_ATTRIBUTES)(key)
		) {
			return {
				...accumulator,
				[key]: String(value),
			}
		}

		/*++
		 + Invalid attribute name → convert to data-*
		 + Convert camelCase to kebab-case
		 */
		const kebabKey = key.replace(
			/[A-Z]/g,
			function toKebab(match: string): string {
				return `-${match.toLowerCase()}`
			},
		)
		return {
			...accumulator,
			[`data-${kebabKey}`]: String(value),
		}
	}

	const attributesResult = reduce(processAttribute)({})(attributeEntries)
	const attributes = getOrElse({} as Readonly<Record<string, string>>)(
		attributesResult,
	)

	/*++
	 + Step 7: Return HTML element config with head and body
	 */
	return {
		_tag: "element" as const,
		tagName: "HTML",
		attributes,
		children: [head, body],
	}
}
