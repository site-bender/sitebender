import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalObservationalStudyProps from "../../../../../types/Thing/MedicalObservationalStudy/index.ts"
import type MedicalStudyProps from "../../../../../types/Thing/MedicalStudy/index.ts"

import MedicalStudy from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalObservationalStudyProps,
	"MedicalObservationalStudy",
	ExtractLevelProps<MedicalObservationalStudyProps, MedicalStudyProps>
>

export default function MedicalObservationalStudy(
	{
		studyDesign,
		schemaType = "MedicalObservationalStudy",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
