import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalStudyProps from "../../../../../types/Thing/MedicalStudy/index.ts"
import type MedicalTrialProps from "../../../../../types/Thing/MedicalTrial/index.ts"

import MedicalStudy from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalTrialProps,
	"MedicalTrial",
	ExtractLevelProps<MedicalTrialProps, MedicalStudyProps>
>

export default function MedicalTrial(
	{
		trialDesign,
		schemaType = "MedicalTrial",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalStudy
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				trialDesign,
				...subtypeProperties,
			}}
		/>
	)
}
