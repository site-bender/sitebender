import type { Text } from "../../../DataType/index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type HowToSupply from "../../Intangible/ListItem/HowToItem/HowToSupply/index.ts"
import type HowToTool from "../../Intangible/ListItem/HowToItem/HowToTool/index.ts"
import type HowToSection from "../../Intangible/ListItem/HowToSection/index.ts"
import type HowToStep from "../../Intangible/ListItem/HowToStep/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type MonetaryAmount from "../../Intangible/StructuredValue/MonetaryAmount/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type CreativeWork from "../index.ts"

export default interface HowTo extends CreativeWork {
	/** The estimated cost of the supply or supplies consumed when performing instructions. */
	estimatedCost?: MonetaryAmount | Text
	/** The length of time it takes to perform instructions or a direction (not including time to prepare the supplies), in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	performTime?: Duration
	/** The length of time it takes to prepare the items to be used in instructions or a direction, in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	prepTime?: Duration
	/** A single step item (as HowToStep, text, document, video, etc.) or a HowToSection. */
	step?: CreativeWork | Text | HowToSection | HowToStep
	/** A single step item (as HowToStep, text, document, video, etc.) or a HowToSection (originally misnamed 'steps'; 'step' is preferred). */
	steps?: Text | ItemList | CreativeWork
	/** A sub-property of instrument. A supply consumed when performing instructions or a direction. */
	supply?: HowToSupply | Text
	/** A sub property of instrument. An object used (but not consumed) when performing instructions or a direction. */
	tool?: HowToTool | Text
	/** The total time required to perform instructions or a direction (including time to prepare the supplies), in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	totalTime?: Duration
	/** The quantity that results by performing instructions. For example, a paper airplane, 10 personalized candles. */
	yield?: QuantitativeValue | Text
}
