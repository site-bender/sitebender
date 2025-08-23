export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Semantic Components - Metadata Components</title>
			<meta
				name="description"
				content="Semantic components that add meaning and structure to content."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<main>
			<h1>Semantic Components</h1>

			<section>
				<h2>Component Types</h2>
				<nav>
					<ul>
						<li>
							<a href="/components/semantic/wrapper">Wrapper Components</a>
							<p>
								Components that wrap content to add semantic meaning and styling
							</p>
						</li>
						<li>
							<a href="/components/semantic/temporal">Temporal Components</a>
							<p>
								Components for dates, times, durations, and other temporal
								concepts
							</p>
						</li>
						<li>
							<a href="/components/semantic/textual">Textual Components</a>
							<p>Components for marking up different types of text content</p>
						</li>
					</ul>
				</nav>
			</section>
		</main>
	)
}
