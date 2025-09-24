import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalSign from "../MedicalCondition/MedicalSignOrSymptom/MedicalSign/index.ts"
import type MedicalDevice from "../MedicalDevice/index.ts"
import type { BloodTestType } from "./BloodTest/index.ts"
import type { ImagingTestType } from "./ImagingTest/index.ts"
import type { MedicalTestPanelType } from "./MedicalTestPanel/index.ts"
import type { PathologyTestType } from "./PathologyTest/index.ts"

import MedicalEnumerationComponent from "../../../../../../codewright/src/define/Thing/Intangible/Enumeration/MedicalEnumeration/index.tsx"
import MedicalConditionComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalCondition/index.tsx"
import MedicalSignComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/MedicalSign/index.tsx"
import MedicalDeviceComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalDevice/index.tsx"
import { Drug as DrugComponent } from "../../../../../codewright/index.tsx"

export type MedicalTestType =
	| "MedicalTest"
	| BloodTestType
	| MedicalTestPanelType
	| ImagingTestType
	| PathologyTestType

export interface MedicalTestProps {
	"@type"?: MedicalTestType
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
