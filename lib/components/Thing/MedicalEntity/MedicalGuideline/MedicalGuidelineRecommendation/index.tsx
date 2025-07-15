import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalGuidelineProps from "../../../../../types/Thing/MedicalGuideline/index.ts"
import type MedicalGuidelineRecommendationProps from "../../../../../types/Thing/MedicalGuidelineRecommendation/index.ts"

import MedicalGuideline from "./index.tsx"

// MedicalGuidelineRecommendation adds no properties to the MedicalGuideline schema type
export type Props = BaseComponentProps<
	MedicalGuidelineRecommendationProps,
	"MedicalGuidelineRecommendation",
	ExtractLevelProps<MedicalGuidelineRecommendationProps, MedicalGuidelineProps>
>

export default function MedicalGuidelineRecommendation({
	schemaType = "MedicalGuidelineRecommendation",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalGuideline
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
