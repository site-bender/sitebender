import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"
import type MedicalTest from "../index.ts"

import MedicalTestPanelComponent from "../../../../../../components/Thing/MedicalEntity/MedicalTest/MedicalTestPanel/index.tsx"

export interface MedicalTestPanelProps {
	subTest?: MedicalTest
}

type MedicalTestPanel =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& MedicalTestPanelProps

export default MedicalTestPanel
