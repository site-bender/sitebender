import Book from "~lib/metadata/creativeWorks/Book/index.tsx"
import Dialogue from "~lib/metadata/quotations/Dialogue/index.tsx"
import TechnicalTerm from "~lib/metadata/scientific/TechnicalTerm/index.tsx"

import Transaction from "~components/templates/Transaction/index.tsx"

import { Fragment } from "~utilities/createElement/index.ts"

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
		<Transaction route={route}>
			<header class="form-header">
				<h1>Test the Metadata Components!</h1>
			</header>

			<section class="metadata-examples">
				<h2>Metadata Components Demo</h2>

				<h3>Scientific Terms</h3>
				<p>
					The molecule{" "}
					<TechnicalTerm
						termType="scientific"
						field="biology"
						title="Deoxyribonucleic acid"
						generateJsonLd
					>
						DNA
					</TechnicalTerm>{" "}
					contains genetic information.
				</p>

				<h3>Book Citations</h3>
				<p>
					<Book
						title="Pride and Prejudice"
						author="Jane Austen"
						publisher="T. Egerton"
						datePublished="1813"
						generateJsonLd
					/>{" "}
					remains a classic of English literature.
				</p>

				<h3>Literary Dialogue</h3>
				<p>
					<Dialogue
						speaker="Elizabeth Bennet"
						mood="sarcastic"
						tone="formal"
						generateJsonLd
					>
						It is a truth universally acknowledged, that a single man in
						possession of a good fortune, must be in want of a wife.
					</Dialogue>
				</p>
			</section>
		</Transaction>
	)
}
