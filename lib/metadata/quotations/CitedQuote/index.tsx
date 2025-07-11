import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	author?: string // Dublin Core: creator
	source?: string // Dublin Core: source
	date?: string // Dublin Core: date
	page?: string | number // Specific page reference
	url?: string // Dublin Core: identifier
	itemProp?: string // schema.org/quotation
	generateJsonLd?: boolean // Generate JSON-LD structured data
	children: string
}

export default function CitedQuote({
	author,
	source,
	date,
	page,
	url,
	itemProp = "quotation",
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "Quotation",
			text: children,
			...(author
				? {
					author: {
						"@type": "Person",
						name: author,
					},
				}
				: {}),
			...(source
				? {
					isPartOf: {
						"@type": "CreativeWork",
						name: source,
						...(date ? { datePublished: date } : {}),
						...(url ? { url } : {}),
					},
				}
				: {}),
			...(page ? { pageStart: String(page) } : {}),
			...(url ? { url } : {}),
		}
		: null

	return (
		<q
			class="cited-quote"
			itemProp={itemProp}
			cite={url}
			{...props}
		>
			{children}

			{/* Microdata */}
			{author && <meta itemProp="author" content={author} />}
			{source && <meta itemProp="isPartOf" content={source} />}
			{date && <meta itemProp="datePublished" content={date} />}
			{page && <meta itemProp="pagination" content={String(page)} />}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</q>
	)
}
