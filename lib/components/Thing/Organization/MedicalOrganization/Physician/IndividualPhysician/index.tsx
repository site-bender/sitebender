import type BaseProps from "../../../../../../types/index.ts"
import type IndividualPhysicianProps from "../../../../../../types/Thing/Organization/MedicalOrganization/Physician/IndividualPhysician/index.ts"

import Physician from "../index.tsx"

export type Props = IndividualPhysicianProps & BaseProps

export default function IndividualPhysician({
	practicesAt,
	_type = "IndividualPhysician",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Physician
			{...props}
			_type={_type}
			subtypeProperties={{
				practicesAt,
				...subtypeProperties,
			}}
		/>
	)
}
