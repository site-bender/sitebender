import type { Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Product from "../../../Product/index.ts"
import type BusinessFunction from "../../Enumeration/BusinessFunction/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Service from "../../Service/index.ts"
import type { StructuredValueProps } from "../index.ts"

import BusinessFunctionComponent from "../../../../../components/Thing/Intangible/Enumeration/BusinessFunction/index.ts"
import ServiceComponent from "../../../../../components/Thing/Intangible/Service/index.ts"
import ProductComponent from "../../../../../components/Thing/Product/index.ts"

export type TypeAndQuantityNodeType = "TypeAndQuantityNode"

export interface TypeAndQuantityNodeProps {
	"@type"?: TypeAndQuantityNodeType
	amountOfThisGood?: Number
	businessFunction?:
		| BusinessFunction
		| ReturnType<typeof BusinessFunctionComponent>
	typeOfGood?:
		| Product
		| Service
		| ReturnType<typeof ProductComponent>
		| ReturnType<typeof ServiceComponent>
	unitCode?: Text | URL
	unitText?: Text
}

type TypeAndQuantityNode =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& TypeAndQuantityNodeProps

export default TypeAndQuantityNode
