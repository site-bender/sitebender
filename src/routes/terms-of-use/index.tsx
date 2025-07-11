import Legal from "~components/templates/Legal/index.tsx"

import { Fragment } from "~utilities/createElement/index.ts"

export type Props = {
	route?: string
}

// Head elements for this page - will be extracted by the build system
export function Head() {
	return (
		<>
			<title>Terms of Use</title>
			<meta name="description" content="Terms of use for our service." />
			<link rel="stylesheet" href="/styles/pages/legal/index.css" />
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<Legal route={route}>
			<h1>Terms of use</h1>
		</Legal>
	)
}
