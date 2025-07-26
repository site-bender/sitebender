import type { Date, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type CategoryCode from "../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type LegalForceStatus from "../../Intangible/Enumeration/StatusEnumeration/LegalForceStatus/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"

export interface LegislationProps {
	jurisdiction?: AdministrativeArea | Text
	legislationAmends?: Legislation
	legislationApplies?: Legislation
	legislationChanges?: Legislation
	legislationCommences?: Legislation
	legislationConsolidates?: Legislation
	legislationCorrects?: Legislation
	legislationCountersignedBy?: Organization | Person
	legislationDate?: Date
	legislationDateOfApplicability?: Date
	legislationDateVersion?: Date
	legislationEnsuresImplementationOf?: Legislation
	legislationIdentifier?: Text | URL
	legislationJurisdiction?: AdministrativeArea | Text
	legislationLegalForce?: LegalForceStatus
	legislationPassedBy?: Organization | Person
	legislationRepeals?: Legislation
	legislationResponsible?: Organization | Person
	legislationTransposes?: Legislation
	legislationType?: CategoryCode | Text
}

type Legislation =
	& Thing
	& CreativeWorkProps
	& LegislationProps

export default Legislation
