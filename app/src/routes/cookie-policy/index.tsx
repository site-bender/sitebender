import Legal from "~components/templates/Legal/index.tsx"

import Fragment from "~utilities/Fragment/index.ts"

export type Props = {
	assets?: Array<string>
	route?: string
}

export function Head() {
	return (
		<>
			<title>Cookie Policy</title>
			<meta
				name="description"
				content="Our cookie policy and data usage information."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<Legal route={route}>
			<h1>Cookie policy</h1>
		</Legal>
	)
}
