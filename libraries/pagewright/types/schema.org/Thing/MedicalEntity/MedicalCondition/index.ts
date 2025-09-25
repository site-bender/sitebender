import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalStudyStatus from "../../Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import type EventStatusType from "../../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type AnatomicalStructure from "../AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type DDxElement from "../MedicalIntangible/DDxElement/index.ts"
import type MedicalConditionStage from "../MedicalIntangible/MedicalConditionStage/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type MedicalRiskFactor from "../MedicalRiskFactor/index.ts"
import type MedicalTest from "../MedicalTest/index.ts"
import type SuperficialAnatomy from "../SuperficialAnatomy/index.ts"
import type { InfectiousDiseaseType } from "./InfectiousDisease/index.ts"
import type MedicalSignOrSymptom from "./MedicalSignOrSymptom/index.ts"
import type { MedicalSignOrSymptomType } from "./MedicalSignOrSymptom/index.ts"

import MedicalStudyStatusComponent from "../../../../../src/define/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.tsx"
import EventStatusTypeComponent from "../../../../../src/define/Thing/Intangible/Enumeration/StatusEnumeration/EventStatusType/index.tsx"
import AnatomicalStructureComponent from "../../../../../src/define/Thing/MedicalEntity/AnatomicalStructure/index.tsx"
import AnatomicalSystemComponent from "../../../../../src/define/Thing/MedicalEntity/AnatomicalSystem/index.tsx"
import MedicalSignOrSymptomComponent from "../../../../../src/define/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/index.tsx"
import DDxElementComponent from "../../../../../src/define/Thing/MedicalEntity/MedicalIntangible/DDxElement/index.tsx"
import MedicalConditionStageComponent from "../../../../../src/define/Thing/MedicalEntity/MedicalIntangible/MedicalConditionStage/index.tsx"
import MedicalTherapyComponent from "../../../../../src/define/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.tsx"
import MedicalRiskFactorComponent from "../../../../../src/define/Thing/MedicalEntity/MedicalRiskFactor/index.tsx"
import MedicalTestComponent from "../../../../../src/define/Thing/MedicalEntity/MedicalTest/index.tsx"
import SuperficialAnatomyComponent from "../../../../../src/define/Thing/MedicalEntity/SuperficialAnatomy/index.tsx"
import DrugComponent from "../../../../../src/define/Thing/Product/Drug/index.tsx"

export type MedicalConditionType =
	| "MedicalCondition"
	| InfectiousDiseaseType
	| MedicalSignOrSymptomType

export interface MedicalConditionProps {
	"@type"?: MedicalConditionType
	associatedAnatomy?:
		| AnatomicalStructure
		| AnatomicalSystem
		| SuperficialAnatomy
		| ReturnType<typeof AnatomicalStructureComponent>
		| ReturnType<typeof AnatomicalSystemComponent>
		| ReturnType<typeof SuperficialAnatomyComponent>
	differentialDiagnosis?: DDxElement | ReturnType<typeof DDxElementComponent>
	drug?: Drug | ReturnType<typeof DrugComponent>
	epidemiology?: Text
	expectedPrognosis?: Text
	naturalProgression?: Text
	pathophysiology?: Text
	possibleComplication?: Text
	possibleTreatment?:
		| MedicalTherapy
		| ReturnType<typeof MedicalTherapyComponent>
	primaryPrevention?:
		| MedicalTherapy
		| ReturnType<typeof MedicalTherapyComponent>
	riskFactor?:
		| MedicalRiskFactor
		| ReturnType<typeof MedicalRiskFactorComponent>
	secondaryPrevention?:
		| MedicalTherapy
		| ReturnType<typeof MedicalTherapyComponent>
	signOrSymptom?:
		| MedicalSignOrSymptom
		| ReturnType<typeof MedicalSignOrSymptomComponent>
	stage?:
		| MedicalConditionStage
		| ReturnType<typeof MedicalConditionStageComponent>
	status?:
		| EventStatusType
		| MedicalStudyStatus
		| Text
		| ReturnType<typeof EventStatusTypeComponent>
		| ReturnType<typeof MedicalStudyStatusComponent>
	typicalTest?: MedicalTest | ReturnType<typeof MedicalTestComponent>
}

type MedicalCondition = Thing & MedicalEntityProps & MedicalConditionProps

export default MedicalCondition
