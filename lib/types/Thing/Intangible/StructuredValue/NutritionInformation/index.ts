import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Energy from "../../Quantity/Energy/index.ts"
import type Mass from "../../Quantity/Mass/index.ts"
import type { StructuredValueProps } from "../index.ts"

export interface NutritionInformationProps {
	/** The number of calories. */
	calories?: Energy
	/** The number of grams of carbohydrates. */
	carbohydrateContent?: Mass
	/** The number of milligrams of cholesterol. */
	cholesterolContent?: Mass
	/** The number of grams of fat. */
	fatContent?: Mass
	/** The number of grams of fiber. */
	fiberContent?: Mass
	/** The number of grams of protein. */
	proteinContent?: Mass
	/** The number of grams of saturated fat. */
	saturatedFatContent?: Mass
	/** The serving size, in terms of the number of volume or mass. */
	servingSize?: Text
	/** The number of milligrams of sodium. */
	sodiumContent?: Mass
	/** The number of grams of sugar. */
	sugarContent?: Mass
	/** The number of grams of trans fat. */
	transFatContent?: Mass
	/** The number of grams of unsaturated fat. */
	unsaturatedFatContent?: Mass
}

type NutritionInformation =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& NutritionInformationProps

export default NutritionInformation
