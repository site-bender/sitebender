import type { Date, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type CategoryCode from "../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type LegalForceStatus from "../../Intangible/Enumeration/StatusEnumeration/LegalForceStatus/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import LegislationComponent from "../../../../components/Thing/CreativeWork/Legislation/index.ts"
import CategoryCodeComponent from "../../../../components/Thing/Intangible/DefinedTerm/CategoryCode/index.ts"
import LegalForceStatusComponent from "../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/LegalForceStatus/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"
import AdministrativeAreaComponent from "../../../../components/Thing/Place/AdministrativeArea/index.ts"

export interface LegislationProps {
	"@type"?: "Legislation"
	jurisdiction?:
		| AdministrativeArea
		| Text
		| ReturnType<typeof AdministrativeAreaComponent>
	legislationAmends?: Legislation | ReturnType<typeof LegislationComponent>
	legislationApplies?: Legislation | ReturnType<typeof LegislationComponent>
	legislationChanges?: Legislation | ReturnType<typeof LegislationComponent>
	legislationCommences?: Legislation | ReturnType<typeof LegislationComponent>
	legislationConsolidates?:
		| Legislation
		| ReturnType<typeof LegislationComponent>
	legislationCorrects?: Legislation | ReturnType<typeof LegislationComponent>
	legislationCountersignedBy?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	legislationDate?: Date
	legislationDateOfApplicability?: Date
	legislationDateVersion?: Date
	legislationEnsuresImplementationOf?:
		| Legislation
		| ReturnType<typeof LegislationComponent>
	legislationIdentifier?: Text | URL
	legislationJurisdiction?:
		| AdministrativeArea
		| Text
		| ReturnType<typeof AdministrativeAreaComponent>
	legislationLegalForce?:
		| LegalForceStatus
		| ReturnType<typeof LegalForceStatusComponent>
	legislationPassedBy?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	legislationRepeals?: Legislation | ReturnType<typeof LegislationComponent>
	legislationResponsible?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	legislationTransposes?: Legislation | ReturnType<typeof LegislationComponent>
	legislationType?:
		| CategoryCode
		| Text
		| ReturnType<typeof CategoryCodeComponent>
}

type Legislation = Thing & CreativeWorkProps & LegislationProps

export default Legislation
