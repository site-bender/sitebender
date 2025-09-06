import Person from "@sitebender/components/define/Thing/Person/index.tsx"

export default function PersonPage() {
	return (
		<body>
			<h1>Person (SSR semantics demo)</h1>
			<p>
				This page renders microdata and adjacent JSON-LD for a Person.
			</p>
			<Person
				name="Ada Lovelace"
				url="https://en.wikipedia.org/wiki/Ada_Lovelace"
			/>
			<p>View source to see the JSON-LD script block.</p>
		</body>
	)
}
