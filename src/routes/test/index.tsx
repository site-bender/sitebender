import { Book } from "~lib/components/index.tsx"
import { Person } from "~lib/components/index.tsx"

export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Test - Metadata Components</title>
			<meta
				name="description"
				content="Test page for demonstrating the metadata components library with live examples."
			/>
		</>
	)
}

const template = `
	{{cite(title)}} by
	{{author.givenName}}
	{{link(
		author.familyName,
		href="https://craft-code.dev/",
		class="author-link",
		title="Da man!"
	)}} (ISBN: {{isbn}})`

export default function ({ route }: Props = {}) {
	return (
		<main>
			<h1>Template Testing</h1>

			<section>
				<h2>Simple string fallbacks</h2>
				<p>
					<Book
						_template={template}
						author={
							<Person
								alternateName="Scott Fitzgerald"
								familyName="Fitzgerald"
								givenName="F. Scott"
								isProp
							/>
						}
						editor={{
							"@type": "Person",
							givenName: "John",
							familyName: "Doe",
						}}
						element="div"
						isbn="9780743273565"
						title="The Great Gatsby"
					>
						<p>Bob's yer uncle!</p>
					</Book>
				</p>
			</section>
		</main>
	)
}
