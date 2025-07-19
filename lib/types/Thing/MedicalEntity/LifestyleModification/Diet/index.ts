import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { LifestyleModificationProps } from "../index.ts"

export interface DietProps {
	/** Nutritional information specific to the dietary plan. May include dietary recommendations on what foods to avoid, what foods to consume, and specific alterations/deviations from the USDA or other regulatory body's approved dietary guidelines. */
	dietFeatures?: Text
	/** People or organizations that endorse the plan. */
	endorsers?: Organization | Person
	/** Medical expert advice related to the plan. */
	expertConsiderations?: Text
	/** Specific physiologic benefits associated to the plan. */
	physiologicalBenefits?: Text
	/** Specific physiologic risks associated to the diet plan. */
	risks?: Text
}

type Diet =
	& Thing
	& LifestyleModificationProps
	& MedicalEntityProps
	& DietProps

export default Diet
