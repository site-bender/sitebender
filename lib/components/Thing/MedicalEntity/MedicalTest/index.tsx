import type BaseProps from "../../../../types/index.ts"
import type MedicalTestProps from "../../../../types/Thing/MedicalEntity/MedicalTest/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalTestProps & BaseProps

export default function MedicalTest({
	affectedBy,
	normalRange,
	signDetected,
	usedToDiagnose,
	usesDevice,
	_type = "MedicalTest",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				affectedBy,
				normalRange,
				signDetected,
				usedToDiagnose,
				usesDevice,
				...subtypeProperties,
			}}
		/>
	)
}
