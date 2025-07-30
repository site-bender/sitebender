import type BaseProps from "../../../../../../types/index.ts"
import type PhysiciansOfficeProps from "../../../../../../types/Thing/Organization/MedicalOrganization/Physician/PhysiciansOffice/index.ts"

import Physician from "../index.tsx"

export type Props = PhysiciansOfficeProps & BaseProps

export default function PhysiciansOffice({
	_type = "PhysiciansOffice",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Physician
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Physician>
	)
}
