import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	varType?: "variable" | "constant" | "function" | "operator" | "set"
	domain?:
		| "algebra"
		| "geometry"
		| "calculus"
		| "statistics"
		| "logic"
		| "number-theory"
	itemProp?: string
	generateJsonLd?: boolean
	children: string
}

export default function MathVar({
	varType = "variable",
	domain,
	itemProp,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "MathematicalExpression",
			mathExpression: children,
			additionalProperty: [
				{
					"@type": "PropertyValue",
					name: "variableType",
					value: varType,
				},
				...(domain
					? [{
						"@type": "PropertyValue",
						name: "mathematicalDomain",
						value: domain,
					}]
					: []),
			],
		}
		: null

	return (
		<i
			class={`math-var var-type-${varType}`}
			itemProp={itemProp || "mathematicalExpression"}
			data-var-type={varType}
			data-domain={domain}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
