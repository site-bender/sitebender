import type { Serializable } from "../index.ts"

import { VIRTUAL_NODE_TAGS } from "../../constants/index.ts"

/*++
 + VirtualNode - Universal representation of DOM nodes as data
 + Used across all Sitebender libraries (Architect, Artificer, Custodian, Operator)
 + Discriminated union with _tag field for type safety
 + Extends Serializable for compatibility with Toolsmith functions
 + Can be serialized to HTML, JSON, YAML, TOML, Turtle, RDF/OWL/SHACL
 */
export type VirtualNode =
	& Serializable
	& (
		| {
			readonly _tag: "element"
			readonly tagName: string
			readonly attributes: Readonly<Record<string, string>>
			readonly children: ReadonlyArray<VirtualNode>
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
 + Type guard helpers for narrowing VirtualNode discriminated union
 */
export type ElementNode = Extract<VirtualNode, { _tag: "element" }>
export type TextNode = Extract<VirtualNode, { _tag: "text" }>
export type CommentNode = Extract<VirtualNode, { _tag: "comment" }>
export type ErrorNode = Extract<VirtualNode, { _tag: "error" }>

/*++
 + Valid _tag values for VirtualNode
 */
export type VirtualNodeTag = (typeof VIRTUAL_NODE_TAGS)[number]
