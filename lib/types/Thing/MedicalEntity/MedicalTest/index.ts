import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalSign from "../MedicalCondition/MedicalSignOrSymptom/MedicalSign/index.ts"
import type MedicalDevice from "../MedicalDevice/index.ts"

import MedicalEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/index.ts"
import MedicalConditionComponent from "../../../../components/Thing/MedicalEntity/MedicalCondition/index.ts"
import MedicalSignComponent from "../../../../components/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/MedicalSign/index.ts"
import MedicalDeviceComponent from "../../../../components/Thing/MedicalEntity/MedicalDevice/index.ts"
import DrugComponent from "../../../../components/Thing/Product/Drug/index.ts"

export interface MedicalTestProps {
	"@type"?: "MedicalTest"
	affectedBy?: Drug | ReturnType<typeof DrugComponent>
	normalRange?:
		| MedicalEnumeration
		| Text
		| ReturnType<typeof MedicalEnumerationComponent>
	signDetected?: MedicalSign | ReturnType<typeof MedicalSignComponent>
	usedToDiagnose?:
		| MedicalCondition
		| ReturnType<typeof MedicalConditionComponent>
	usesDevice?: MedicalDevice | ReturnType<typeof MedicalDeviceComponent>
}

type MedicalTest = Thing & MedicalEntityProps & MedicalTestProps

export default MedicalTest
