import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type AnatomicalStructure from "../AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../AnatomicalSystem/index.ts"
import type DDxElement from "../MedicalIntangible/DDxElement/index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type EventStatusType from "../../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type MedicalConditionStage from "../MedicalIntangible/MedicalConditionStage/index.ts"
import type MedicalRiskFactor from "../MedicalRiskFactor/index.ts"
import type MedicalSignOrSymptom from "./MedicalSignOrSymptom/index.ts"
import type MedicalStudyStatus from "../../Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import type MedicalTest from "../MedicalTest/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type SuperficialAnatomy from "../SuperficialAnatomy/index.ts"

export interface MedicalConditionProps {
	associatedAnatomy?:
		| AnatomicalStructure
		| AnatomicalSystem
		| SuperficialAnatomy
	differentialDiagnosis?: DDxElement
	drug?: Drug
	epidemiology?: Text
	expectedPrognosis?: Text
	naturalProgression?: Text
	pathophysiology?: Text
	possibleComplication?: Text
	possibleTreatment?: MedicalTherapy
	primaryPrevention?: MedicalTherapy
	riskFactor?: MedicalRiskFactor
	secondaryPrevention?: MedicalTherapy
	signOrSymptom?: MedicalSignOrSymptom
	stage?: MedicalConditionStage
	status?: EventStatusType | MedicalStudyStatus | Text
	typicalTest?: MedicalTest
}

type MedicalCondition =
	& Thing
	& MedicalEntityProps
	& MedicalConditionProps

export default MedicalCondition
