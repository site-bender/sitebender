import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../../MedicalEntity/index.ts"
import type { LifestyleModificationProps } from "../../MedicalEntity/LifestyleModification/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"

export interface DietProps {
	dietFeatures?: Text
	endorsers?: Organization | Person
	expertConsiderations?: Text
	physiologicalBenefits?: Text
	risks?: Text
}

type Diet =
	& Thing
	& MedicalEntityProps
	& LifestyleModificationProps
	& CreativeWorkProps
	& DietProps

export default Diet
