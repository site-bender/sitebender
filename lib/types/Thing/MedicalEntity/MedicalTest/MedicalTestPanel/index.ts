import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type MedicalTest from "../index.ts"
import type { MedicalTestProps } from "../index.ts"

import MedicalTestComponent from "../../../../../components/Thing/MedicalEntity/MedicalTest/index.ts"

export type MedicalTestPanelType = "MedicalTestPanel"

export interface MedicalTestPanelProps {
	"@type"?: MedicalTestPanelType
	subTest?: MedicalTest | ReturnType<typeof MedicalTestComponent>
}

type MedicalTestPanel =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& MedicalTestPanelProps

export default MedicalTestPanel
