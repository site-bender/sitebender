import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import map from "@sitebender/toolsmith/array/map/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import min from "@sitebender/toolsmith/math/min/index.ts"

/*++
 + List of HTML sectioning elements that increase heading depth
 + Per HTML5 spec and WCAG guidelines
 */
const SECTIONING_ELEMENTS = [
	"ARTICLE",
	"ASIDE",
	"NAV",
	"SECTION",
] as const

/*++
 + Maximum heading level supported by HTML (H6)
 */
const MAX_HEADING_LEVEL = 6

/*++
 + Minimum practical heading level
 + Per user requirements: should never go below H3 or H4
 */
const MIN_PRACTICAL_LEVEL = 3

/*++
 + Resolves context-aware headings (HN) to actual heading levels (H1-H6)
 + based on sectioning element nesting depth
 +
 + Walks VirtualNode tree top-down, tracking sectioning depth:
 + - Article/Section/Aside/Nav increase depth by 1
 + - HN elements are resolved to H{depth+1}
 + - Capped at H6 (HTML max) and warned if exceeds practical depth
 +
 + Called automatically after VirtualNode tree creation
 */
export default function _resolveHeadingLevels(vnode: VirtualNode) {
	return function _resolveHeadingLevelsWithVnode(
		sectionDepth: number = 0,
	): VirtualNode {
		/*++
		 + Only process element nodes
		 + Text, comment, and error nodes pass through unchanged
		 */
		if (vnode._tag !== "element") {
			return vnode
		}

		/*++
		 + Check if current element is a sectioning element
		 + These increase the heading level for descendants
		 */
		const isSectioningElement = includes(SECTIONING_ELEMENTS)(vnode.tagName)

		/*++
		 + Calculate new depth for children
		 + Sectioning elements add 1 to depth, others maintain current depth
		 */
		const newDepth = isSectioningElement ? sectionDepth + 1 : sectionDepth

		/*++
		 + Process HN placeholder elements
		 */
		if (vnode.tagName === "HN") {
			/*++
			 + Calculate heading level: depth + 1
			 + - At root (depth 0): H1
			 + - Inside one section (depth 1): H2
			 + - Inside nested section (depth 2): H3
			 + - etc.
			 */
			const calculatedLevel = sectionDepth + 1

			/*++
			 + Warn in development if nesting is excessive
			 + Per user requirements: shouldn't go below H3 or H4
			 */
			const shouldWarn = calculatedLevel > MIN_PRACTICAL_LEVEL

			/*++
			 + Cap at H6 (HTML maximum)
			 */
			const level = min(calculatedLevel)(MAX_HEADING_LEVEL)

			/*++
			 + Resolve HN → actual heading level
			 + Add warning attribute if excessive nesting detected
			 */
			/*++
			 + Helper to resolve child with current depth
			 */
			function resolveChildWithDepth(child: VirtualNode): VirtualNode {
				return _resolveHeadingLevels(child)(newDepth)
			}

			return {
				_tag: "element" as const,
				tagName: `H${level}` as const,
				attributes: shouldWarn
					? {
						...vnode.attributes,
						"data-§-warning-excessive-nesting": `Heading depth ${calculatedLevel} exceeds practical limit of ${MIN_PRACTICAL_LEVEL}`,
					}
					: vnode.attributes,
				children: map(resolveChildWithDepth)(
					vnode.children,
				) as ReadonlyArray<VirtualNode>,
			}
		}

		/*++
		 + For all other element nodes, recurse to children
		 */
		function resolveChildWithNewDepth(child: VirtualNode): VirtualNode {
			return _resolveHeadingLevels(child)(newDepth)
		}

		return {
			_tag: "element" as const,
			tagName: vnode.tagName,
			attributes: vnode.attributes,
			children: map(resolveChildWithNewDepth)(
				vnode.children,
			) as ReadonlyArray<VirtualNode>,
			namespace: vnode.namespace,
		}
	}
}
