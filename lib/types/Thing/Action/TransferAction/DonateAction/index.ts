import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type PriceSpecification from "../../../Intangible/StructuredValue/PriceSpecification/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import AudienceComponent from "../../../../../components/Thing/Intangible/Audience/index.ts"
import ContactPointComponent from "../../../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.ts"
import PriceSpecificationComponent from "../../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"
import OrganizationComponent from "../../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export interface DonateActionProps {
	"@type"?: "DonateAction"
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
