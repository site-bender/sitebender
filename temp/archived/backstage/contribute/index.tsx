import Contribute from "~components/templates/Contribute/index.tsx"

import { Fragment } from "~utilities/createElement/index.ts"

export type Props = {
	assets?: Array<string>
	route?: string
}

export function Head() {
	return (
		<>
			<title>Contribute - Backstage</title>
			<meta
				name="description"
				content="Contribute content and help grow our community."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<Contribute route={route}>
			<p>We all want to contribute.</p>
		</Contribute>
	)
}
