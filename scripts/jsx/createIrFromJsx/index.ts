import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import test from "@sitebender/toolsmith/vanilla/string/test/index.ts"

import type {
	IRElement,
	IRNode,
	JSXAttributeNode,
	JSXElementNode,
	JSXExpressionContainerNode,
	JSXFragmentNode,
	JSXIdentifierNode,
	JSXTextNode,
	UnknownJSXNode,
} from "../types/index.ts"

import serializeExpression from "../serializeExpression/index.ts"

//++ Converts a JSX AST node to intermediate representation
export default function createIrFromJsx(node: UnknownJSXNode): IRNode {
	const nodeType = node.type

	const isJsxText = nodeType === "JSXText"
	const isJsxExpression = nodeType === "JSXExpressionContainer"
	const isJsxFragment = nodeType === "JSXFragment"
	const isJsxElement = nodeType === "JSXElement"

	const textNode = isJsxText
		? { type: "text" as const, value: (node as JSXTextNode).value }
		: null

	const expressionNode = isJsxExpression
		? {
			type: "expression" as const,
			expr: serializeExpression(
				(node as JSXExpressionContainerNode).expression,
			),
		}
		: null

	const fragmentNode = isJsxFragment
		? {
			type: "fragment" as const,
			children: map(createIrFromJsx)((node as JSXFragmentNode).children),
		}
		: null

	const elementNode = isJsxElement
		? (() => {
			const element = node as JSXElementNode
			const opening = element.openingElement
			const tag = opening.name
			const tagIsIdentifier =
				(tag as { type?: string }).type === "JSXIdentifier"
			const tagName = tagIsIdentifier
				? (tag as JSXIdentifierNode).name
				: ((tag as { name?: { name?: string } }).name?.name ?? "Unknown")
			const isIntrinsic = tagIsIdentifier && test(/^[a-z]/)(tagName)
			const type = isIntrinsic ? "element" as const : "component" as const
			const name = tagName

			const props = reduce<JSXAttributeNode, IRElement["props"]>(
				(acc, attr) => {
					const isJsxAttribute = attr.type === "JSXAttribute"

					return isJsxAttribute
						? (() => {
							const a = attr as JSXAttributeNode
							const value = a.value
							const isStringLiteral = value?.type === "StringLiteral"
							const isExpression = value?.type === "JSXExpressionContainer"

							return isStringLiteral
								? { ...acc, [a.name.name]: (value as { value: string }).value }
								: isExpression
								? {
									...acc,
									[a.name.name]: {
										type: "expression" as const,
										expr: serializeExpression(
											(value as { expression: unknown }).expression,
										),
									},
								}
								: acc
						})()
						: acc
				},
			)({})(opening.attributes as Array<JSXAttributeNode>)

			return {
				type,
				name,
				props,
				children: map(createIrFromJsx)(element.children),
			}
		})()
		: null

	return textNode || expressionNode || fragmentNode || elementNode ||
		{ type: "text" as const, value: "" }
}
