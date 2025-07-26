import type { Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type BusinessFunction from "../../Enumeration/BusinessFunction/index.ts"
import type Product from "../../../Product/index.ts"
import type Service from "../../Service/index.ts"

export interface TypeAndQuantityNodeProps {
	amountOfThisGood?: Number
	businessFunction?: BusinessFunction
	typeOfGood?: Product | Service
	unitCode?: Text | URL
	unitText?: Text
}

type TypeAndQuantityNode =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& TypeAndQuantityNodeProps

export default TypeAndQuantityNode
