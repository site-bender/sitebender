import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalGuidelineProps } from "../../../../../types/Thing/MedicalEntity/MedicalGuideline/index.ts"
import type { MedicalGuidelineRecommendationProps } from "../../../../../types/Thing/MedicalEntity/MedicalGuideline/MedicalGuidelineRecommendation/index.ts"

import MedicalGuideline from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalGuidelineRecommendationProps,
	"MedicalGuidelineRecommendation",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalGuidelineProps>
>

export default function MedicalGuidelineRecommendation({
	recommendationStrength,
	schemaType = "MedicalGuidelineRecommendation",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalGuideline
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				recommendationStrength,
				...subtypeProperties,
			}}
		/>
	)
}
