import join from "@sitebender/toolsmith/vanilla/array/join/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

import type { ComponentModule, IRNode, SerializedExpr } from "../types/index.ts"

import evalExpressionAst from "../evalExpressionAst/index.ts"

//++ Renders an IR node to HTML string
export default async function renderIrToHtml(
	node: IRNode,
	context: Record<string, unknown>,
	componentModule: ComponentModule,
): Promise<string> {
	const nodeType = node.type

	const isText = nodeType === "text"
	const isExpression = nodeType === "expression"
	const isElement = nodeType === "element"
	const isFragment = nodeType === "fragment"
	const isComponent = nodeType === "component"

	const textResult = isText ? (node as { value: string }).value : null

	const expressionResult = isExpression
		? String(
			evalExpressionAst((node as { expr: SerializedExpr }).expr, context),
		)
		: null

	const elementResult = isElement
		? await (async () => {
			const element = node as {
				name: string
				props: Record<
					string,
					string | { type: "expression"; expr: SerializedExpr }
				>
				children: Array<IRNode>
			}

			const propsArray = Object.entries(element.props || {})

			const mapPropsToStrings = map(([k, v]: [string, unknown]) => {
				const isExpressionProp = typeof v === "object" && v !== null &&
					(v as { type?: string }).type === "expression"

				return isExpressionProp
					? `${k}="${
						String(
							evalExpressionAst(
								(v as { type: string; expr: SerializedExpr }).expr,
								context,
							),
						)
					}"`
					: `${k}="${String(v)}"`
			})

			const propsStrings = mapPropsToStrings(propsArray)
			const propsStr = join(" ")(propsStrings)

			const openTag = `<${element.name}${propsStr ? " " + propsStr : ""}>`
			const closeTag = `</${element.name}>`

			const childrenHtml = await Promise.all(
				map((c: IRNode) => renderIrToHtml(c, context, componentModule))(
					element.children,
				),
			)

			return openTag + join("")(childrenHtml) + closeTag
		})()
		: null

	const fragmentResult = isFragment
		? await (async () => {
			const fragment = node as { children: Array<IRNode> }
			const childrenHtml = await Promise.all(
				map((c: IRNode) => renderIrToHtml(c, context, componentModule))(
					fragment.children,
				),
			)
			return join("")(childrenHtml)
		})()
		: null

	const componentResult = isComponent
		? await (async () => {
			const component = node as {
				name: string
				props: Record<
					string,
					string | { type: "expression"; expr: SerializedExpr }
				>
			}

			const componentFn = componentModule[component.name]

			const componentNotFound = !componentFn

			const errorResult = componentNotFound
				? (() => {
					throw new Error(`Component '${component.name}' not found in module`)
				})()
				: null

			const evaluatedProps = reduce<[string, unknown], Record<string, unknown>>(
				(acc, [k, v]) => {
					const maybeExpr = v as { type?: string; expr?: SerializedExpr }
					const isExpression = maybeExpr?.type === "expression"

					const evaluatedValue = isExpression
						? evalExpressionAst(maybeExpr.expr as SerializedExpr, context)
						: v

					return { ...acc, [k]: evaluatedValue }
				},
			)({})(Object.entries(component.props))

			const childIR = errorResult || await componentFn(evaluatedProps)

			return renderIrToHtml(childIR as IRNode, context, componentModule)
		})()
		: null

	return textResult ?? expressionResult ?? elementResult ?? fragmentResult ??
		componentResult ?? ""
}
