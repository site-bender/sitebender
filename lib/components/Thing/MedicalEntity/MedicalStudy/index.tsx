import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalStudyProps } from "../../../../types/Thing/MedicalEntity/MedicalStudy/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalStudyProps,
	"MedicalStudy",
	ExtractLevelProps<ThingProps, MedicalEntityProps>
>

export default function MedicalStudy({
	healthCondition,
	sponsor,
	status,
	studyLocation,
	studySubject,
	schemaType = "MedicalStudy",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
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
