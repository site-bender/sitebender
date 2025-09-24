//++ [GROUP] Type definitions for JSX/TSX processing

//++ Text node in IR
export type IRText = { type: "text"; value: string }

//++ Expression node in IR
export type IRExpr = { type: "expression"; expr: SerializedExpr }

//++ Element or component node in IR
export type IRElement = {
	type: "element" | "component"
	name: string
	props: Record<string, string | { type: "expression"; expr: SerializedExpr }>
	children: Array<IRNode>
}

//++ Fragment node in IR
export type IRFragment = { type: "fragment"; children: Array<IRNode> }

//++ Any IR node type
export type IRNode = IRText | IRExpr | IRElement | IRFragment

//++ Serialized expression types
export type SerializedExpr =
	| { type: "Identifier"; name: string }
	| { type: "StringLiteral"; value: string }
	| { type: "NumericLiteral"; value: number }
	| { type: "Unsupported"; raw: string }

//++ JSX text node from parser
export type JSXTextNode = { type: "JSXText"; value: string }

//++ JSX expression container from parser
export type JSXExpressionContainerNode = {
	type: "JSXExpressionContainer"
	expression: unknown
}

//++ JSX fragment from parser
export type JSXFragmentNode = { type: "JSXFragment"; children: Array<UnknownJSXNode> }

//++ JSX identifier from parser
export type JSXIdentifierNode = { type: "JSXIdentifier"; name: string }

//++ JSX attribute value from parser
export type JSXAttributeValue =
	| { type: "StringLiteral"; value: string }
	| { type: "JSXExpressionContainer"; expression: unknown }

//++ JSX attribute from parser
export type JSXAttributeNode = {
	type: "JSXAttribute"
	name: { name: string }
	value?: JSXAttributeValue
}

//++ JSX opening element from parser
export type JSXOpeningElementNode = {
	name: JSXIdentifierNode | { name?: { name?: string } }
	attributes: Array<JSXAttributeNode>
}

//++ JSX element from parser
export type JSXElementNode = {
	type: "JSXElement"
	openingElement: JSXOpeningElementNode
	children: Array<UnknownJSXNode>
}

//++ Any JSX node type
export type UnknownJSXNode =
	| JSXTextNode
	| JSXExpressionContainerNode
	| JSXFragmentNode
	| JSXElementNode
	| { type: string; [k: string]: unknown }

//++ Component module type
export type ComponentModule = Record<
	string,
	(props: Record<string, unknown>) => IRNode | Promise<IRNode>
>

//++ [END]