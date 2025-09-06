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

import { AnatomicalStructure as AnatomicalStructureComponent } from "../../../../../components/index.tsx"
import { AnatomicalSystem as AnatomicalSystemComponent } from "../../../../../components/index.tsx"
import { DDxElement as DDxElementComponent } from "../../../../../components/index.tsx"
import { Drug as DrugComponent } from "../../../../../components/index.tsx"
import { EventStatusType as EventStatusTypeComponent } from "../../../../../components/index.tsx"
import { MedicalConditionStage as MedicalConditionStageComponent } from "../../../../../components/index.tsx"
import { MedicalRiskFactor as MedicalRiskFactorComponent } from "../../../../../components/index.tsx"
import { MedicalSignOrSymptom as MedicalSignOrSymptomComponent } from "../../../../../components/index.tsx"
import { MedicalStudyStatus as MedicalStudyStatusComponent } from "../../../../../components/index.tsx"
import { MedicalTest as MedicalTestComponent } from "../../../../../components/index.tsx"
import { MedicalTherapy as MedicalTherapyComponent } from "../../../../../components/index.tsx"
import { SuperficialAnatomy as SuperficialAnatomyComponent } from "../../../../../components/index.tsx"

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
