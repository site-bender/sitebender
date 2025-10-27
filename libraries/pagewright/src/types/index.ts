import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

/*++
 + Type definitions for Pagewright element configuration
 + All types use readonly for immutability
 */

/*++
 + Element configuration - discriminated union with _tag
 + Can be element, text, comment, or error node
 + Extends Serializable for use with Toolsmith functions
 */
export type ElementConfig = Serializable &
	(
		| {
				readonly _tag: "element"
				readonly tagName: string
				readonly attributes: Readonly<Record<string, string>>
				readonly children: ReadonlyArray<ElementConfig>
				readonly namespace?: string
		  }
		| {
				readonly _tag: "text"
				readonly content: string
		  }
		| {
				readonly _tag: "comment"
				readonly content: string
		  }
		| {
				readonly _tag: "error"
				readonly code: string
				readonly message: string
				readonly received?: unknown
				readonly context?: string
		  }
	)

/*++
 + Child can be string, number, ElementConfig, array of children, or nullish/boolean (converted to error nodes)
 */
export type Child =
	| string
	| number
	| ElementConfig
	| ReadonlyArray<Child>
	| null
	| undefined
	| boolean

/*++
 + Props are attributes plus optional children
 + Keys are attribute names, values are attribute values
 */
export type Props = Readonly<{
	children?: ReadonlyArray<Child>
	[key: string]: unknown
}>

/*++
 + Component can be a function that returns ElementConfig or a string (intrinsic HTML element)
 */
export type Component = ((props: Props) => ElementConfig) | string
