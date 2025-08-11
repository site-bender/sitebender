import Transaction from "~components/template/Transaction/index.tsx"

import Fragment from "~utilities/Fragment/index.ts"

export type Props = {
	route?: string
}

// Head elements for this page - will be extracted by the build system
export function Head() {
	return (
		<>
			<title>Contact</title>
			<meta name="description" content="Get in touch with us." />
			<link rel="stylesheet" href="/styles/pages/contact/index.css" />
			<style>
				{`
				p, li, ol, h2, h3, span {
					margin-block-start: 1em;
				}
			`}
			</style>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<Transaction route={route}>
			<h1>Contact us</h1>
		</Transaction>
	)
}
