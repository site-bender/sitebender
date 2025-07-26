import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"
import type MedicalTest from "../index.ts"

export interface MedicalTestPanelProps {
	subTest?: MedicalTest
}

type MedicalTestPanel =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& MedicalTestPanelProps

export default MedicalTestPanel
