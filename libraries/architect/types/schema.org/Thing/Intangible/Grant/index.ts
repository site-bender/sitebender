import type BioChemEntity from "../../BioChemEntity/index.ts"
import type CreativeWork from "../../CreativeWork/index.ts"
import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type MedicalEntity from "../../MedicalEntity/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Product from "../../Product/index.ts"
import type { IntangibleProps } from "../index.ts"
import type { MonetaryGrantType } from "./MonetaryGrant/index.ts"

import BioChemEntityComponent from "../../../../../../codewright/src/define/Thing/BioChemEntity/index.tsx"
import CreativeWorkComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/index.tsx"
import EventComponent from "../../../../../../codewright/src/define/Thing/Event/index.tsx"
import MedicalEntityComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/index.tsx"
import OrganizationComponent from "../../../../../../codewright/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../codewright/src/define/Thing/Person/index.tsx"
import ProductComponent from "../../../../../../codewright/src/define/Thing/Product/index.tsx"

export type GrantType = "Grant" | MonetaryGrantType

export interface GrantProps {
	"@type"?: GrantType
	fundedItem?:
		| BioChemEntity
		| CreativeWork
		| Event
		| MedicalEntity
		| Organization
		| Person
		| Product
		| ReturnType<typeof BioChemEntityComponent>
		| ReturnType<typeof CreativeWorkComponent>
		| ReturnType<typeof EventComponent>
		| ReturnType<typeof MedicalEntityComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
		| ReturnType<typeof ProductComponent>
	funder?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	sponsor?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type Grant = Thing & IntangibleProps & GrantProps

export default Grant
