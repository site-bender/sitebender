import Legal from "~components/template/Legal/index.tsx"

import Fragment from "~utilities/Fragment/index.ts"

export type Props = {
	assets?: Array<string>
	route?: string
}

export function Head() {
	return (
		<>
			<title>Privacy Policy</title>
			<meta
				name="description"
				content="Our privacy policy and data protection information."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<Legal route={route}>
			<h1>Privacy policy</h1>
		</Legal>
	)
}
