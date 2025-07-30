import type BaseProps from "../../../../../types/index.ts"
import type VeterinaryCareProps from "../../../../../types/Thing/Organization/MedicalOrganization/VeterinaryCare/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = VeterinaryCareProps & BaseProps

export default function VeterinaryCare({
	_type = "VeterinaryCare",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalOrganization
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</MedicalOrganization>
	)
}
