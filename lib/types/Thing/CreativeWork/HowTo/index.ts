import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type HowToSupply from "../../Intangible/ListItem/HowToItem/HowToSupply/index.ts"
import type HowToTool from "../../Intangible/ListItem/HowToItem/HowToTool/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type MonetaryAmount from "../../Intangible/StructuredValue/MonetaryAmount/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type HowToSection from "../HowToSection/index.ts"
import type HowToStep from "../HowToStep/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import HowToSectionComponent from "../../../../components/Thing/CreativeWork/HowToSection/index.ts"
import HowToStepComponent from "../../../../components/Thing/CreativeWork/HowToStep/index.ts"
import CreativeWorkComponent from "../../../../components/Thing/CreativeWork/index.ts"
import ItemListComponent from "../../../../components/Thing/Intangible/ItemList/index.ts"
import HowToSupplyComponent from "../../../../components/Thing/Intangible/ListItem/HowToItem/HowToSupply/index.ts"
import HowToToolComponent from "../../../../components/Thing/Intangible/ListItem/HowToItem/HowToTool/index.ts"
import DurationComponent from "../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import MonetaryAmountComponent from "../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface HowToProps {
	"@type"?: "HowTo"
	estimatedCost?:
		| MonetaryAmount
		| Text
		| ReturnType<typeof MonetaryAmountComponent>
	performTime?: Duration | ReturnType<typeof DurationComponent>
	prepTime?: Duration | ReturnType<typeof DurationComponent>
	step?:
		| CreativeWork
		| HowToSection
		| HowToStep
		| Text
		| ReturnType<typeof CreativeWorkComponent>
		| ReturnType<typeof HowToSectionComponent>
		| ReturnType<typeof HowToStepComponent>
	steps?:
		| CreativeWork
		| ItemList
		| Text
		| ReturnType<typeof CreativeWorkComponent>
		| ReturnType<typeof ItemListComponent>
	supply?: HowToSupply | Text | ReturnType<typeof HowToSupplyComponent>
	tool?: HowToTool | Text | ReturnType<typeof HowToToolComponent>
	totalTime?: Duration | ReturnType<typeof DurationComponent>
	yield?:
		| QuantitativeValue
		| Text
		| ReturnType<typeof QuantitativeValueComponent>
}

type HowTo = Thing & CreativeWorkProps & HowToProps

export default HowTo
