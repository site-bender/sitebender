import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalGuidelineProps } from "../index.ts"

export interface MedicalGuidelineRecommendationProps {
	recommendationStrength?: Text
}

type MedicalGuidelineRecommendation =
	& Thing
	& MedicalEntityProps
	& MedicalGuidelineProps
	& MedicalGuidelineRecommendationProps

export default MedicalGuidelineRecommendation
