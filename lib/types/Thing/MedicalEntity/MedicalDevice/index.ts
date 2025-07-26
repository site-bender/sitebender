import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalContraindication from "../MedicalContraindication/index.ts"
import type MedicalEntity from "../index.ts"

export interface MedicalDeviceProps {
	adverseOutcome?: MedicalEntity
	contraindication?: MedicalContraindication | Text
	postOp?: Text
	preOp?: Text
	procedure?: Text
	seriousAdverseOutcome?: MedicalEntity
}

type MedicalDevice =
	& Thing
	& MedicalEntityProps
	& MedicalDeviceProps

export default MedicalDevice
