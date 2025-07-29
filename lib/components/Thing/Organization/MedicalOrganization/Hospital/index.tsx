import type BaseProps from "../../../../../types/index.ts"
import type HospitalProps from "../../../../../types/Thing/Organization/MedicalOrganization/Hospital/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = HospitalProps & BaseProps

export default function Hospital({
	_type = "Hospital",
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
