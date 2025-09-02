import createElement from "~utilities/createElement/index.ts"

type Props = {
	name: string
	url?: string
}

// Minimal SSR-only Person helper
// - Renders semantic HTML with microdata
// - Emits adjacent JSON-LD (no client JS required)
export default function Person({ name, url }: Props) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name,
		...(url ? { url } : {}),
	}

	return [
		<div key="microdata" itemscope itemtype="https://schema.org/Person">
			<span itemprop="name">{name}</span>
			{url && (
				<div>
					<a itemprop="url" href={url} rel="me noopener noreferrer">
						{url}
					</a>
				</div>
			)}
		</div>,
		<script type="application/ld+json" key="jsonld">{JSON.stringify(jsonLd)}</script>,
	]
}
