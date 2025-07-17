import Book from "~lib/components/Thing/CreativeWork/Book/index.tsx"
import Organization from "~lib/components/Thing/Organization/index.tsx"
import Person from "~lib/components/Thing/Person/index.tsx"

import Fragment from "~utilities/Fragment/index.ts"

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

export default function ({ route }: Props = {}) {
	return (
		<main>
			<p>Simple string fallbacks</p>
			<p>
				<Book
					title="Gravity's Rainbow"
					author="Thomas Pynchon"
					format="{{cite(title)}} by {{author}}"
				/>
			</p>

			<p>Rich nested objects</p>
			<p>
				<Book
					title="Gravity's Rainbow"
					format="{{cite(title)}} by {{familyFirst(author)}}"
				>
					<Person property="author" familyName="Pynchon" givenName="Thomas" />
				</Book>
			</p>

			<p>Multiple nested objects</p>
			<p>
				<Book
					title="The Hobbit"
					format="{{cite(title)}} by {{familyFirst(author)}}, published by {{publisher.name}}"
				>
					<Person property="author" familyName="Tolkien" givenName="J.R.R." />
					<Organization property="publisher" name="George Allen & Unwin" />
				</Book>
			</p>
		</main>
	)
}
