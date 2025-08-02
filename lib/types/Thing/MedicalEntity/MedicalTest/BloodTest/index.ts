import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"

export type BloodTestType = "BloodTest"

export interface BloodTestProps {
	"@type"?: BloodTestType
}

type BloodTest = Thing & MedicalEntityProps & MedicalTestProps & BloodTestProps

export default BloodTest
