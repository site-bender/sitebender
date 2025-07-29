import type BaseProps from "../../../../types/index.ts"
import type MedicalStudyProps from "../../../../types/Thing/MedicalEntity/MedicalStudy/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalStudyProps & BaseProps

export default function MedicalStudy({
	healthCondition,
	sponsor,
	status,
	studyLocation,
	studySubject,
	_type = "MedicalStudy",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				healthCondition,
				sponsor,
				status,
				studyLocation,
				studySubject,
				...subtypeProperties,
			}}
		/>
	)
}
