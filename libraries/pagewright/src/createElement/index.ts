import type { Component, Props, Child, ElementConfig } from "../types/index.ts"

import isFunction from "@sitebender/toolsmith/predicates/isFunction/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import entries from "@sitebender/toolsmith/object/entries/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import _processChildren from "./_processChildren/index.ts"
import _createElementConfig from "./_createElementConfig/index.ts"
import _callComponent from "./_callComponent/index.ts"
import _reduceAttributes from "./_reduceAttributes/index.ts"

/*++
 + Creates an element configuration from JSX
 + Called by JSX transform with (component, props, ...children)
 + Returns ElementConfig for element, text, or comment nodes
 */
export default function createElement(component: Component) {
	return function createElementWithComponent(props: Props | null) {
		return function createElementWithComponentAndProps(
			...children: ReadonlyArray<Child>
		): ElementConfig {
			/*++
			 + [EXCEPTION] Rest parameters allowed for collecting children
			 + [EXCEPTION] Object spread allowed for merging props (creates new object)
			 */

			/*++
			 + Step 1: Process children first (recursively, inside-out)
			 */
			const processedChildren = _processChildren(children)

			/*++
			 + Step 2: If component is a function, call it with props + children
			 */
			if (isFunction(component)) {
				return _callComponent(component)({
					...props,
					children: processedChildren,
				})
			}

			/*++
			 + Step 3: If component is a string (intrinsic element), create element config
			 */
			if (isString(component)) {
				/*++
				 + Extract attributes from props, excluding children
				 + [EXCEPTION] Object spread allowed for creating attributes object
				 */
				const { children: _childrenFromProps, ...attributes } = props || {}

				/*++
				 + Convert attributes to Record<string, string>
				 + All attribute values must be strings for HTML
				 + Use reduce to build string attributes immutably
				 */
				const attributeEntries = entries(attributes)
				const stringAttributesResult = reduce(_reduceAttributes)({})(
					attributeEntries,
				)
				const stringAttributes = getOrElse({})(stringAttributesResult)

				return _createElementConfig(component)(stringAttributes)(
					processedChildren,
				)
			}

			/*++
			 + Invalid component type - this shouldn't happen with proper TypeScript usage
			 + Return error element config for graceful degradation
			 */
			return {
				_tag: "element" as const,
				tagName: "SPAN",
				attributes: {
					"data-error": "Invalid component type",
					"data-component-type": typeof component,
				},
				children: processedChildren,
			}
		}
	}
}
