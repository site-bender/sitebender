import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../../MedicalEntity/index.ts"
import type { LifestyleModificationProps } from "../../MedicalEntity/LifestyleModification/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"

export type DietType = "Diet"

export interface DietProps {
	"@type"?: DietType
	dietFeatures?: Text
	endorsers?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
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
