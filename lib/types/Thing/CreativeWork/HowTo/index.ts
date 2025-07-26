import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type CreativeWork from "../index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type HowToSection from "../HowToSection/index.ts"
import type HowToStep from "../HowToStep/index.ts"
import type HowToSupply from "../../Intangible/ListItem/HowToItem/HowToSupply/index.ts"
import type HowToTool from "../../Intangible/ListItem/HowToItem/HowToTool/index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type MonetaryAmount from "../../Intangible/StructuredValue/MonetaryAmount/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface HowToProps {
	estimatedCost?: MonetaryAmount | Text
	performTime?: Duration
	prepTime?: Duration
	step?: CreativeWork | HowToSection | HowToStep | Text
	steps?: CreativeWork | ItemList | Text
	supply?: HowToSupply | Text
	tool?: HowToTool | Text
	totalTime?: Duration
	yield?: QuantitativeValue | Text
}

type HowTo =
	& Thing
	& CreativeWorkProps
	& HowToProps

export default HowTo
