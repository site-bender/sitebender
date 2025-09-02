import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalContraindication from "../MedicalContraindication/index.ts"

import { MedicalContraindication as MedicalContraindicationComponent } from "../../../../../components/index.tsx"
import { MedicalEntity as MedicalEntityComponent } from "../../../../../components/index.tsx"

export type MedicalDeviceType = "MedicalDevice"

export interface MedicalDeviceProps {
	"@type"?: MedicalDeviceType
	adverseOutcome?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
	contraindication?:
		| MedicalContraindication
		| Text
		| ReturnType<typeof MedicalContraindicationComponent>
	postOp?: Text
	preOp?: Text
	procedure?: Text
	seriousAdverseOutcome?:
		| MedicalEntity
		| ReturnType<typeof MedicalEntityComponent>
}

type MedicalDevice = Thing & MedicalEntityProps & MedicalDeviceProps

export default MedicalDevice
