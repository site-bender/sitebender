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
import type MedicalSignOrSymptom from "./MedicalSignOrSymptom/index.ts"

import MedicalStudyStatusComponent from "../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import EventStatusTypeComponent from "../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import AnatomicalStructureComponent from "../../../../components/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import AnatomicalSystemComponent from "../../../../components/Thing/MedicalEntity/AnatomicalSystem/index.ts"
import MedicalSignOrSymptomComponent from "../../../../components/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/index.ts"
import DDxElementComponent from "../../../../components/Thing/MedicalEntity/MedicalIntangible/DDxElement/index.ts"
import MedicalConditionStageComponent from "../../../../components/Thing/MedicalEntity/MedicalIntangible/MedicalConditionStage/index.ts"
import MedicalTherapyComponent from "../../../../components/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import MedicalRiskFactorComponent from "../../../../components/Thing/MedicalEntity/MedicalRiskFactor/index.ts"
import MedicalTestComponent from "../../../../components/Thing/MedicalEntity/MedicalTest/index.ts"
import SuperficialAnatomyComponent from "../../../../components/Thing/MedicalEntity/SuperficialAnatomy/index.ts"
import DrugComponent from "../../../../components/Thing/Product/Drug/index.ts"

export interface MedicalConditionProps {
	"@type"?: "MedicalCondition"
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
	riskFactor?: MedicalRiskFactor | ReturnType<typeof MedicalRiskFactorComponent>
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
