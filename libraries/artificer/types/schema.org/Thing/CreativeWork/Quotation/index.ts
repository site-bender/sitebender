import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import OrganizationComponent from "../../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../architect/src/define/Thing/Person/index.tsx"

export type QuotationType = "Quotation"

export interface QuotationProps {
	"@type"?: QuotationType
	spokenByCharacter?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type Quotation = Thing & CreativeWorkProps & QuotationProps

export default Quotation
