import { Text } from "../../../../DataType/index.ts"
import MedicalGuideline from "../index.ts"

export default interface MedicalGuidelineRecommendation
	extends MedicalGuideline {
	/** Strength of the guideline's recommendation (e.g. 'class I'). */
	recommendationStrength?: Text
}
