import type BaseProps from "../../../../../types/index.ts"
import type { PharmacyProps } from "../../../../../types/Thing/Organization/MedicalOrganization/Pharmacy/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = PharmacyProps & BaseProps

export default function Pharmacy({
	_type = "Pharmacy",
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
		/>
	)
}
