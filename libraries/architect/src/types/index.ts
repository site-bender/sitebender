/*++
 + Re-export VirtualNode types from Toolsmith
 + VirtualNode is the universal document tree structure used across all Sitebender libraries
 + Architect uses but doesn't define this type
 */
export type {
	CommentNode,
	ElementNode,
	ErrorNode,
	TextNode,
	VirtualNode,
	VirtualNodeTag,
} from "@sitebender/toolsmith/types/index.ts"
export { VIRTUAL_NODE_TAGS } from "@sitebender/toolsmith/types/index.ts"

/*++
 + Child type is Architect-specific for JSX children
 + Defines what can appear as JSX children (not all Sitebender libraries use JSX)
 + Can be string, number, VirtualNode, array of children, or nullish/boolean (converted to error nodes)
 */
export type Child =
	| string
	| number
	| import("@sitebender/toolsmith/types/index.ts").VirtualNode
	| ReadonlyArray<Child>
	| null
	| undefined
	| boolean

/*++
 + Props are Architect-specific for JSX components
 + Keys are attribute names, values are attribute values
 + Optional children array for JSX child elements
 */
export type Props = Readonly<{
	children?: ReadonlyArray<Child>
	[key: string]: unknown
}>

/*++
 + Component type for JSX - Architect-specific
 + Can be a function that returns VirtualNode or a string (intrinsic HTML element)
 */
export type Component =
	| ((props: Props) => import("@sitebender/toolsmith/types/index.ts").VirtualNode)
	| string
