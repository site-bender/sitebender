import type BaseProps from "../../../../../types/index.ts"
import type MedicalGuidelineRecommendationProps from "../../../../../types/Thing/MedicalEntity/MedicalGuideline/MedicalGuidelineRecommendation/index.ts"

import MedicalGuideline from "../index.tsx"

export type Props = MedicalGuidelineRecommendationProps & BaseProps

export default function MedicalGuidelineRecommendation({
	recommendationStrength,
	_type = "MedicalGuidelineRecommendation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalGuideline
			{...props}
			_type={_type}
			subtypeProperties={{
				recommendationStrength,
				...subtypeProperties,
			}}
		>
			{children}
		</MedicalGuideline>
	)
}
