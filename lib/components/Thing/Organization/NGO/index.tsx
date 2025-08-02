import type BaseProps from "../../../../types/index.ts"
import type NGOProps from "../../../../types/Thing/Organization/NGO/index.ts"

import Organization from "../index.tsx"

export type Props = NGOProps & BaseProps

export default function NGO({
	_type = "NGO",
	children,
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
		>
			{children}
		</Organization>
	)
}
