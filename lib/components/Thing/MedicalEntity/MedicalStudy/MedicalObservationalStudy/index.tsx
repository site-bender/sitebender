import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalStudyProps } from "../../../../../types/Thing/MedicalEntity/MedicalStudy/index.ts"
import type { MedicalObservationalStudyProps } from "../../../../../types/Thing/MedicalEntity/MedicalStudy/MedicalObservationalStudy/index.ts"

import MedicalStudy from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalObservationalStudyProps,
	"MedicalObservationalStudy",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalStudyProps>
>

export default function MedicalObservationalStudy({
	studyDesign,
	schemaType = "MedicalObservationalStudy",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalStudy
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				studyDesign,
				...subtypeProperties,
			}}
		/>
	)
}
