import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	rank?:
		| "kingdom"
		| "phylum"
		| "class"
		| "order"
		| "family"
		| "genus"
		| "species"
		| "subspecies"
	authority?: string // Taxonomic authority
	year?: string | number
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean // Generate JSON-LD structured data
	children: string
}

export default function TaxonomicName({
	rank = "species",
	authority,
	year,
	itemProp,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "Taxon",
			name: children,
			taxonRank: rank,
			...(rank !== "kingdom"
				? {
					parentTaxon: {
						"@type": "Taxon",
						name: "Parent taxon",
					},
				}
				: {}),
			hasDefinedTerm: {
				"@type": "DefinedTerm",
				name: children,
				inDefinedTermSet: {
					"@type": "DefinedTermSet",
					name: "Biological taxonomy",
				},
			},
			additionalProperty: [
				...(authority
					? [{
						"@type": "PropertyValue",
						name: "taxonomic authority",
						value: authority,
					}]
					: []),
				...(year
					? [{
						"@type": "PropertyValue",
						name: "year described",
						value: String(year),
					}]
					: []),
			],
		}
		: null

	return (
		<i
			class={`taxonomic-name rank-${rank}`}
			itemProp={itemProp}
			data-rank={rank}
			data-authority={authority}
			data-year={year}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
