import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"

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
