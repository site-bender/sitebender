import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface QuotationProps {
	spokenByCharacter?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type Quotation = Thing & CreativeWorkProps & QuotationProps

export default Quotation
