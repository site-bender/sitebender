import { Text } from "../../../DataType/index.ts"
import MedicalStudyStatus from "../../Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import EventStatusType from "../../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import MedicalEntity from "../index.ts"
import MedicalCondition from "../MedicalCondition/index.ts"

export default interface MedicalStudy extends MedicalEntity {
	/** Specifying the health condition(s) of a patient, medical study, or other target audience. */
	healthCondition?: MedicalCondition
	/** A person or organization that supports a thing through a pledge, promise, or financial contribution. E.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
	sponsor?: Person | Organization
	/** The status of the study (enumerated). */
	status?: MedicalStudyStatus | Text | EventStatusType
	/** The location in which the study is taking/took place. */
	studyLocation?: AdministrativeArea
	/** A subject of the study, i.e. one of the medical conditions, therapies, devices, drugs, etc. investigated by the study. */
	studySubject?: MedicalEntity
}
