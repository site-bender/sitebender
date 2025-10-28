import type { Date, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type CategoryCode from "../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type LegalForceStatus from "../../Intangible/Enumeration/StatusEnumeration/LegalForceStatus/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { LegislationObjectType } from "./LegislationObject/index.ts"

import LegislationComponent from "../../../../../../architect/src/define/Thing/CreativeWork/Legislation/index.tsx"
import CategoryCodeComponent from "../../../../../../architect/src/define/Thing/Intangible/DefinedTerm/CategoryCode/index.tsx"
import LegalForceStatusComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/StatusEnumeration/LegalForceStatus/index.tsx"
import OrganizationComponent from "../../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../architect/src/define/Thing/Person/index.tsx"
import AdministrativeAreaComponent from "../../../../../../architect/src/define/Thing/Place/AdministrativeArea/index.tsx"

export type LegislationType = "Legislation" | LegislationObjectType

export interface LegislationProps {
	"@type"?: LegislationType
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
	legislationTransposes?:
		| Legislation
		| ReturnType<typeof LegislationComponent>
	legislationType?:
		| CategoryCode
		| Text
		| ReturnType<typeof CategoryCodeComponent>
}

type Legislation = Thing & CreativeWorkProps & LegislationProps

export default Legislation
