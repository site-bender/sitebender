import { Text } from "../../../../DataType/index.ts"
import Energy from "../../Quantity/Energy/index.ts"
import Mass from "../../Quantity/Mass/index.ts"
import StructuredValue from "../index.ts"

export default interface NutritionInformation extends StructuredValue {
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
