import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	manufacturer?: string // schema.org/manufacturer
	version?: string // schema.org/softwareVersion or productID
	category?: string // schema.org/category
	url?: string // schema.org/url
	itemProp?: string // schema.org/name
	generateJsonLd?: boolean
	children: string
}

export default function ProductName({
	manufacturer,
	version,
	category,
	url,
	itemProp = "name",
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "Product",
			name: children,
			...(manufacturer
				? {
					manufacturer: {
						"@type": "Organization",
						name: manufacturer,
					},
				}
				: {}),
			...(version ? { model: version } : {}),
			...(category ? { category } : {}),
			...(url ? { url } : {}),
		}
		: null

	return (
		<b
			class="product-name"
			itemProp={itemProp}
			data-manufacturer={manufacturer}
			data-version={version}
			data-category={category}
			{...props}
		>
			{children}

			{/* Microdata */}
			{manufacturer && <meta itemProp="manufacturer" content={manufacturer} />}
			{version && <meta itemProp="version" content={version} />}
			{category && <meta itemProp="category" content={category} />}
			{url && <meta itemProp="url" content={url} />}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</b>
	)
}
