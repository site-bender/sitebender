import Manage from "~components/templates/Manage/index.tsx"

import { Fragment } from "~utilities/createElement/index.ts"

export type Props = {
	assets?: Array<string>
	route?: string
}

export function Head() {
	return (
		<>
			<title>Manage - Backstage</title>
			<meta
				name="description"
				content="Management tools and administrative functions."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<Manage route={route}>
			<p>I can manage it!</p>
		</Manage>
	)
}
