import type BaseProps from "../../../../types/index.ts"
import type MedicalCauseProps from "../../../../types/Thing/MedicalEntity/MedicalCause/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalCauseProps & BaseProps

export default function MedicalCause({
	causeOf,
	_type = "MedicalCause",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				causeOf,
				...subtypeProperties,
			}}
		/>
	)
}
