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

import { HowToSection as HowToSectionComponent } from "../../../../../components/index.tsx"
import { HowToStep as HowToStepComponent } from "../../../../../components/index.tsx"
import { CreativeWork as CreativeWorkComponent } from "../../../../../components/index.tsx"
import { ItemList as ItemListComponent } from "../../../../../components/index.tsx"
import { HowToSupply as HowToSupplyComponent } from "../../../../../components/index.tsx"
import { HowToTool as HowToToolComponent } from "../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../components/index.tsx"
import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"

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
