// BloodTest extends MedicalTest but adds no additional properties
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface BloodTestProps {}

type BloodTest =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& BloodTestProps

export default BloodTest
