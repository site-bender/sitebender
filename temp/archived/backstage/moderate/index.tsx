import Moderate from "~components/templates/Moderate/index.tsx"

import { Fragment } from "~utilities/createElement/index.ts"

export type Props = {
	assets?: Array<string>
	route?: string
}

export function Head() {
	return (
		<>
			<title>Moderate - Backstage</title>
			<meta
				name="description"
				content="Content moderation tools and guidelines."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<Moderate route={route}>
			<p>Moderation in all things, including moderation.</p>
		</Moderate>
	)
}
