import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"

export interface BloodTestProps {
}

type BloodTest =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& BloodTestProps

export default BloodTest
