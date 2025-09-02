import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type PriceSpecification from "../../../Intangible/StructuredValue/PriceSpecification/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import { Audience as AudienceComponent } from "../../../../../../components/index.tsx"
import { ContactPoint as ContactPointComponent } from "../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"
import { PriceSpecification as PriceSpecificationComponent } from "../../../../../../components/index.tsx"

export type DonateActionType = "DonateAction"

export interface DonateActionProps {
	"@type"?: DonateActionType
	price?: Number | Text
	priceCurrency?: Text
	priceSpecification?:
		| PriceSpecification
		| ReturnType<typeof PriceSpecificationComponent>
	recipient?:
		| Audience
		| ContactPoint
		| Organization
		| Person
		| ReturnType<typeof AudienceComponent>
		| ReturnType<typeof ContactPointComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type DonateAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& DonateActionProps

export default DonateAction
