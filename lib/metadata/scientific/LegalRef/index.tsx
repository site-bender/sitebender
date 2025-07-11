import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	caseType?: "court" | "statute" | "regulation" | "treaty" | "constitution"
	jurisdiction?: string
	year?: string | number
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function LegalRef({
	caseType = "court",
	jurisdiction,
	year,
	itemProp,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "Legislation",
			name: children,
			legislationType: caseType,
			...(jurisdiction
				? {
					jurisdiction: {
						"@type": "AdministrativeArea",
						name: jurisdiction,
					},
				}
				: {}),
			...(year ? { datePublished: String(year) } : {}),
		}
		: null

	return (
		<cite
			class={`legal-ref case-type-${caseType}`}
			itemProp={itemProp}
			data-case-type={caseType}
			data-jurisdiction={jurisdiction}
			data-year={year}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</cite>
	)
}
