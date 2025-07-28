import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type PriceSpecification from "../../../Intangible/StructuredValue/PriceSpecification/index.ts"

import DonateActionComponent from "../../../../../../components/Thing/Action/TransferAction/DonateAction/index.tsx"

export interface DonateActionProps {
	price?: Number | Text
	priceCurrency?: Text
	priceSpecification?: PriceSpecification
	recipient?: Audience | ContactPoint | Organization | Person
}

type DonateAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& DonateActionProps

export default DonateAction
