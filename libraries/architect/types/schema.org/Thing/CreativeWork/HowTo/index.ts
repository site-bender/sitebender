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
import type { RecipeType } from "./Recipe/index.ts"

import CreativeWorkComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/index.tsx"
import ItemListComponent from "../../../../../../codewright/src/define/Thing/Intangible/ItemList/index.tsx"
import HowToSupplyComponent from "../../../../../../codewright/src/define/Thing/Intangible/ListItem/HowToItem/HowToSupply/index.tsx"
import HowToToolComponent from "../../../../../../codewright/src/define/Thing/Intangible/ListItem/HowToItem/HowToTool/index.tsx"
import DurationComponent from "../../../../../../codewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import MonetaryAmountComponent from "../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"
import QuantitativeValueComponent from "../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import { HowToSection as HowToSectionComponent } from "../../../../../codewright/index.tsx"
import { HowToStep as HowToStepComponent } from "../../../../../codewright/index.tsx"

export type HowToType = "HowTo" | RecipeType

export interface HowToProps {
	"@type"?: HowToType
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
