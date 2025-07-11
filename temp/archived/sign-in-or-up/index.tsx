import InOrUp from "~components/forms/InOrUp/index.tsx"
import Transaction from "~components/templates/Transaction/index.tsx"

import { Fragment } from "~utilities/createElement/index.ts"

export type Props = {
	assets?: Array<string>
	route?: string
}

export function Head() {
	return (
		<>
			<title>Sign In or Sign Up</title>
			<meta
				name="description"
				content="Sign in to your account or create a new one."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<Transaction route={route}>
			<InOrUp />
		</Transaction>
	)
}
