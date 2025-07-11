import Backstage from "~components/templates/Backstage/index.tsx"

import { Fragment } from "~utilities/createElement/index.ts"

export type Props = {
	assets?: Array<string>
	route?: string
}

export function Head() {
	return (
		<>
			<title>Backstage</title>
			<meta
				name="description"
				content="Access the backstage area for contributors and moderators."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<Backstage route={route}>
			<p>Shootout at the backstage pass!</p>
		</Backstage>
	)
}
