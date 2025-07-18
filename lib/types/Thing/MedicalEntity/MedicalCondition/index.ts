import type { Text } from "../../../DataType/index.ts"
import type MedicalStudyStatus from "../../Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import type EventStatusType from "../../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type AnatomicalStructure from "../AnatomicalStructure/index.ts"
import type AnatomicalSystem from "../AnatomicalSystem/index.ts"
import type MedicalEntity from "../index.ts"
import type DDxElement from "../MedicalIntangible/DDxElement/index.ts"
import type MedicalConditionStage from "../MedicalIntangible/MedicalConditionStage/index.ts"
import type MedicalTherapy from "../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type MedicalRiskFactor from "../MedicalRiskFactor/index.ts"
import type MedicalTest from "../MedicalTest/index.ts"
import type SuperficialAnatomy from "../SuperficialAnatomy/index.ts"
import type MedicalSignOrSymptom from "./MedicalSignOrSymptom/index.ts"

export default interface MedicalCondition extends MedicalEntity {
	/** The anatomy of the underlying organ system or structures associated with this entity. */
	associatedAnatomy?:
		| AnatomicalStructure
		| SuperficialAnatomy
		| AnatomicalSystem
	/** One of a set of differential diagnoses for the condition. Specifically, a closely-related or competing diagnosis typically considered later in the cognitive process whereby this medical condition is distinguished from others most likely responsible for a similar collection of signs and symptoms to reach the most parsimonious diagnosis or diagnoses in a patient. */
	differentialDiagnosis?: DDxElement
	/** Specifying a drug or medicine used in a medication procedure. */
	drug?: Drug
	/** The characteristics of associated patients, such as age, gender, race etc. */
	epidemiology?: Text
	/** The likely outcome in either the short term or long term of the medical condition. */
	expectedPrognosis?: Text
	/** The expected progression of the condition if it is not treated and allowed to progress naturally. */
	naturalProgression?: Text
	/** Changes in the normal mechanical, physical, and biochemical functions that are associated with this activity or condition. */
	pathophysiology?: Text
	/** A possible unexpected and unfavorable evolution of a medical condition. Complications may include worsening of the signs or symptoms of the disease, extension of the condition to other organ systems, etc. */
	possibleComplication?: Text
	/** A possible treatment to address this condition, sign or symptom. */
	possibleTreatment?: MedicalTherapy
	/** A preventative therapy used to prevent an initial occurrence of the medical condition, such as vaccination. */
	primaryPrevention?: MedicalTherapy
	/** A modifiable or non-modifiable factor that increases the risk of a patient contracting this condition, e.g. age,  coexisting condition. */
	riskFactor?: MedicalRiskFactor
	/** A preventative therapy used to prevent reoccurrence of the medical condition after an initial episode of the condition. */
	secondaryPrevention?: MedicalTherapy
	/** A sign or symptom of this condition. Signs are objective or physically observable manifestations of the medical condition while symptoms are the subjective experience of the medical condition. */
	signOrSymptom?: MedicalSignOrSymptom
	/** The stage of the condition, if applicable. */
	stage?: MedicalConditionStage
	/** The status of the study (enumerated). */
	status?: MedicalStudyStatus | Text | EventStatusType
	/** A medical test typically performed given this condition. */
	typicalTest?: MedicalTest
}
