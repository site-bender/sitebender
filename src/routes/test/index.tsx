import Base from "~lib/components/Base/index.tsx"
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
			<h1>Template Testing</h1>

			<section>
				<h2>Simple string fallbacks</h2>
				<p>
					<Base
						format="{{cite(title)}} by {{familyFirst(author)}}"
						props={{
							title: "Gravity's Rainbow",
							author: Person({
								givenName: "Thomas",
								familyName: "Pynchon",
							}),
						}}
					/>
				</p>
			</section>

			<section>
				<h2>Rich nested objects</h2>
				<p>
					<Base
						format="{{cite(title)}} by {{familyFirst(author)}}"
						props={{
							title: "Gravity's Rainbow",
							author: Person({
								givenName: "Thomas",
								familyName: "Pynchon",
							}),
						}}
					/>
				</p>
			</section>

			<section>
				<h2>Multiple nested objects</h2>
				<p>
					<Base
						format="{{cite(title)}} by {{familyFirst(author)}}, published by {{publisher.name}}"
						props={{
							title: "The Hobbit",
							author: Person({
								givenName: "J.R.R.",
								familyName: "Tolkien",
							}),
							publisher: Organization({
								name: "George Allen & Unwin",
							}),
						}}
					/>
				</p>
			</section>
		</main>
	)
}
