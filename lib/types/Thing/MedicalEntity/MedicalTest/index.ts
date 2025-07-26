import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalDevice from "../MedicalDevice/index.ts"
import type MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type MedicalSign from "../MedicalCondition/MedicalSignOrSymptom/MedicalSign/index.ts"

export interface MedicalTestProps {
	affectedBy?: Drug
	normalRange?: MedicalEnumeration | Text
	signDetected?: MedicalSign
	usedToDiagnose?: MedicalCondition
	usesDevice?: MedicalDevice
}

type MedicalTest =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps

export default MedicalTest
