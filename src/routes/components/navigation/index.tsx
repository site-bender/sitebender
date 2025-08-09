import Link from "~lib/components/navigation/Link/index.tsx"

export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Navigation Components - Metadata Components</title>
			<meta
				name="description"
				content="Components for links, menus, etc."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<main>
			<h1>Temporal Components</h1>

			<section>
				<h2>Link Component</h2>
				<p>
					Provides a flexible way to create links with various semantic and
					security attributes.
				</p>
				<ul>
					<li>
						{/* Internal link - no special handling */}
						<Link to="/about" class="internal-link">
							About Us
						</Link>
					</li>
					<li>
						{/* External link - gets noopener and nofollow by default */}
						<Link to="https://external.example">
							External Site (secure by default)
						</Link>
					</li>
					<li>
						{/* External link with overrides (not recommended) */}
						<Link
							to="https://trusted.example"
							allowTabJacking
							allowSearchEngineIndexing
							openAs="newTab"
						>
							Trusted External Site (less secure)
						</Link>
					</li>
					<li>
						{/* External link with additional privacy */}
						<Link
							to="https://private.example"
							hideReferringPage
						>
							Private External Link (with noreferrer)
						</Link>
					</li>
					<li>
						{/* Special to values maintain security */}
						<Link to="@top">
							Back to Top
						</Link>
					</li>
					<li>
						{/* Download link */}
						<Link to="/manual.pdf" asDownload>
							Download Manual
						</Link>
					</li>
				</ul>
			</section>
		</main>
	)
}
