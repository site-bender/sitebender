import type BaseProps from "../../../../../types/index.ts"
import type SpecialtyProps from "../../../../../types/Thing/Intangible/Enumeration/Specialty/index.ts"

import Enumeration from "../index.tsx"

export type Props = SpecialtyProps & BaseProps

export default function Specialty({
	_type = "Specialty",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Enumeration>
	)
}
