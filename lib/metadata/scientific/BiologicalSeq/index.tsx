import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	seqType?: "dna" | "rna" | "protein" | "peptide"
	notation?: "iupac" | "simplified" | "extended"
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function BiologicalSeq({
	seqType = "dna",
	notation = "iupac",
	itemProp,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "MolecularEntity",
			"identifier": children,
			"additionalType":
				`http://purl.obolibrary.org/obo/${seqType.toUpperCase()}`,
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "sequenceType",
					"value": seqType,
				},
				{
					"@type": "PropertyValue",
					"name": "notation",
					"value": notation,
				},
			],
		}
		: null

	return (
		<code
			class={`biological-seq seq-type-${seqType}`}
			itemProp={itemProp}
			data-seq-type={seqType}
			data-notation={notation}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</code>
	)
}
