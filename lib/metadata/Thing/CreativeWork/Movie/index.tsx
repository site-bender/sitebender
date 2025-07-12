import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import { FORMATS } from "../../constants/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"
import formatTemplate from "../../helpers/formatTemplate/index.ts"

type Props = {
	title: string
	director?: string
	actor?: string | string[]
	studio?: string
	datePublished?: string
	duration?: string // ISO 8601 duration
	genre?: string | string[]
	contentRating?: string
	format?: string
	itemProp?: string
	generateJsonLd?: boolean
}

export default function Movie({
	title,
	director,
	actor,
	studio,
	datePublished,
	duration,
	genre,
	contentRating,
	format = "{{title}}",
	itemProp = "name",
	generateJsonLd = false,
	...props
}: Props) {
	// Pre-process data with semantic formatting
	const templateData = {
		title: `<cite>${title}</cite>`,
		director,
		actor: Array.isArray(actor) ? actor.join(", ") : actor,
		studio,
		datePublished,
		year: datePublished ? new Date(datePublished).getFullYear().toString() : "",
		duration,
		genre: Array.isArray(genre) ? genre.join(", ") : genre,
		contentRating,
	}

	// Get format template (either from FORMATS constant or use format directly)
	const templateString =
		FORMATS.movie?.[format as keyof typeof FORMATS.movie] || format

	// Generate HTML content
	const content = formatTemplate(templateString, templateData)

	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "Movie",
			name: title,
			...(director ? { director: { "@type": "Person", name: director } } : {}),
			...(actor
				? {
					actor: Array.isArray(actor)
						? actor.map((name) => ({ "@type": "Person", name }))
						: { "@type": "Person", name: actor },
				}
				: {}),
			...(studio
				? { productionCompany: { "@type": "Organization", name: studio } }
				: {}),
			...(datePublished ? { datePublished } : {}),
			...(duration ? { duration } : {}),
			...(genre ? { genre: Array.isArray(genre) ? genre : [genre] } : {}),
			...(contentRating ? { contentRating } : {}),
		}
		: null

	return (
		<cite
			class="movie"
			itemProp={itemProp}
			data-work-type="movie"
			{...props}
			dangerouslySetInnerHTML={{ __html: content }}
		>
			{/* Microdata */}
			{director && <meta itemProp="director" content={director} />}
			{studio && <meta itemProp="productionCompany" content={studio} />}
			{datePublished && (
				<meta itemProp="datePublished" content={datePublished} />
			)}
			{duration && <meta itemProp="duration" content={duration} />}
			{contentRating && (
				<meta itemProp="contentRating" content={contentRating} />
			)}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</cite>
	)
}
