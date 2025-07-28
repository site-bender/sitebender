import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type Energy from "../../Quantity/Energy/index.ts"
import type Mass from "../../Quantity/Mass/index.ts"

import NutritionInformationComponent from "../../../../../../components/Thing/Intangible/StructuredValue/NutritionInformation/index.tsx"

export interface NutritionInformationProps {
	calories?: Energy
	carbohydrateContent?: Mass
	cholesterolContent?: Mass
	fatContent?: Mass
	fiberContent?: Mass
	proteinContent?: Mass
	saturatedFatContent?: Mass
	servingSize?: Text
	sodiumContent?: Mass
	sugarContent?: Mass
	transFatContent?: Mass
	unsaturatedFatContent?: Mass
}

type NutritionInformation =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& NutritionInformationProps

export default NutritionInformation
