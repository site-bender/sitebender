import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalStudyProps } from "../../../../../types/Thing/MedicalEntity/MedicalStudy/index.ts"
import type { MedicalTrialProps } from "../../../../../types/Thing/MedicalEntity/MedicalStudy/MedicalTrial/index.ts"

import MedicalStudy from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalTrialProps,
	"MedicalTrial",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalStudyProps>
>

export default function MedicalTrial({
	trialDesign,
	schemaType = "MedicalTrial",
	subtypeProperties = {},
	...props
}): Props {
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
