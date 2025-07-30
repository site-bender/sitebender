import type BaseProps from "../../../../types/index.ts"
import type CooperativeProps from "../../../../types/Thing/Organization/Cooperative/index.ts"

import Organization from "../index.tsx"

export type Props = CooperativeProps & BaseProps

export default function Cooperative({
	_type = "Cooperative",
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
		>{children}</Organization>
	)
}
