import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	title: string
	url: string
	author?: string
	publisher?: string
	datePublished?: string
	format?: string
	itemProp?: string
	generateJsonLd?: boolean
}

export default function WebSite({
	title,
	url,
	author,
	publisher,
	datePublished,
	format = "titleOnly",
	itemProp = "name",
	generateJsonLd = false,
	...props
}: Props) {
	let content
	const year = datePublished ? new Date(datePublished).getFullYear() : ""

	switch (format) {
		case "titleOnly":
			content = title
			break
		case "titleURL":
			content = <a href={url}>{title}</a>
			break
		case "simple":
			content = <>{title} ({url})</>
			break
		case "citation":
			content = <>{author}. "{title}" {publisher}, {year}, {url}.</>
			break
		default:
			content = title
	}

	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: title,
			url,
			...(author ? { author: { "@type": "Person", name: author } } : {}),
			...(publisher
				? { publisher: { "@type": "Organization", name: publisher } }
				: {}),
			...(datePublished ? { datePublished } : {}),
			inLanguage: "en",
		}
		: null

	return (
		<cite
			class="website"
			itemProp={itemProp}
			data-work-type="website"
			{...props}
		>
			{content}

			{/* Microdata */}
			{author && <meta itemProp="author" content={author} />}
			{publisher && <meta itemProp="publisher" content={publisher} />}
			{datePublished && (
				<meta itemProp="datePublished" content={datePublished} />
			)}
			<meta itemProp="url" content={url} />
			<meta itemProp="inLanguage" content="en" />

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</cite>
	)
}
