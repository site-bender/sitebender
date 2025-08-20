export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Components - Metadata Components</title>
			<meta
				name="description"
				content="Component library documentation with live examples."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<main>
			<h1>Component Library</h1>

			<section>
				<h2>Categories</h2>
				<nav>
					<ul>
						<li>
							<a href="/components/semantic">Semantic Components</a>
							<p>Components that provide semantic meaning to content</p>
						</li>
					</ul>
				</nav>
			</section>
		</main>
	)
}
