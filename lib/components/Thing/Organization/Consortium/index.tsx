import type BaseProps from "../../../../types/index.ts"
import type { ConsortiumProps } from "../../../../types/Thing/Organization/Consortium/index.ts"

import Organization from "../index.tsx"

export type Props = ConsortiumProps & BaseProps

export default function Consortium({
	_type = "Consortium",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
