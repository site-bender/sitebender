import Book from "~lib/components/Thing/CreativeWork/Book/index.tsx"
import Person from "~lib/components/Thing/Person/index.tsx"

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

const tmplt = `
	{{cite(name, style="color:red")}} by
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
						author={
							<Person
								alternateName="Scott Fitzgerald"
								familyName="Fitzgerald"
								givenName="F. Scott"
								isProp
							/>
						}
						editor={{
							_type: "Person",
							givenName: "John",
							familyName: "Doe",
						}}
						_template={tmplt}
						name="The Great Gatsby"
						isbn="9780743273565"
					/>
				</p>
			</section>
		</main>
	)
}
