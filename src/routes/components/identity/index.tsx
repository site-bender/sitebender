export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Identity Components - Sitebender</title>
			<meta
				name="description"
				content="Components for identifying and marking up specific types of content with semantic meaning."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<main>
			<h1>Identity Components</h1>
			<p>
				Components that identify and mark up specific types of content with
				semantic meaning, providing rich metadata for both human readers and
				machines.
			</p>

			<section>
				<h2>Component Categories</h2>
				<nav>
					<ul>
						<li>
							<a href="/components/identity/narrative">
								<strong>Narrative</strong>
							</a>
							{" - "}
							Characters, relationships, roles, and story elements
						</li>
						<li>
							<strong>Linguistic</strong> (coming soon) - Foreign terms,
							technical vocabulary, etymology
						</li>
						<li>
							<strong>Scientific</strong> (coming soon) - Taxonomic names,
							chemical formulas, units
						</li>
						<li>
							<strong>Cultural</strong> (coming soon) - Idioms, proverbs,
							cultural references
						</li>
						<li>
							<strong>Quotations</strong> (coming soon) - Dialogue, citations,
							epigraphs
						</li>
					</ul>
				</nav>
			</section>
		</main>
	)
}