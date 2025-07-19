import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type MedicalTest from "../index.ts"
import type { MedicalTestProps } from "../index.ts"

export interface MedicalTestPanelProps {
	/** A component test of the panel. */
	subTest?: MedicalTest
}

type MedicalTestPanel =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& MedicalTestPanelProps

export default MedicalTestPanel
