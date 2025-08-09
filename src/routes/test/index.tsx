import { Book } from "~lib/components/index.tsx"
import { Person } from "~lib/components/index.tsx"
import {
	EMOJI,
	TONE,
} from "~lib/components/semantic/wrappers/constants/index.ts"
import SpokenAs from "~lib/components/semantic/wrappers/SpokenAs/index.tsx"
import WithTone from "~lib/components/semantic/wrappers/WithTone/index.tsx"

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
						isbn="9780743273565"
						title="The Great Gatsby"
					>
						<div>Bob's yer uncle!</div>
					</Book>
				</p>
				<p>
					<WithTone tone={TONE.happy} emoji={EMOJI.happy}>
						I'm so happy that I can use this component!
					</WithTone>
				</p>
				<p>
					<WithTone tone={TONE.ecstatic} emoji={EMOJI.ecstatic}>
						This is the greatest component ever!!!
					</WithTone>
				</p>
				<p>
					<SpokenAs ipa="/mʌˈnɒt/" phonetic="muh-NAHT">
						Munat
					</SpokenAs>
				</p>
			</section>
		</main>
	)
}
