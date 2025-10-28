import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Energy from "../../Quantity/Energy/index.ts"
import type Mass from "../../Quantity/Mass/index.ts"
import type { StructuredValueProps } from "../index.ts"

import EnergyComponent from "../../../../../../../architect/src/define/Thing/Intangible/Quantity/Energy/index.tsx"
import MassComponent from "../../../../../../../architect/src/define/Thing/Intangible/Quantity/Mass/index.tsx"

export type NutritionInformationType = "NutritionInformation"

export interface NutritionInformationProps {
	"@type"?: NutritionInformationType
	calories?: Energy | ReturnType<typeof EnergyComponent>
	carbohydrateContent?: Mass | ReturnType<typeof MassComponent>
	cholesterolContent?: Mass | ReturnType<typeof MassComponent>
	fatContent?: Mass | ReturnType<typeof MassComponent>
	fiberContent?: Mass | ReturnType<typeof MassComponent>
	proteinContent?: Mass | ReturnType<typeof MassComponent>
	saturatedFatContent?: Mass | ReturnType<typeof MassComponent>
	servingSize?: Text
	sodiumContent?: Mass | ReturnType<typeof MassComponent>
	sugarContent?: Mass | ReturnType<typeof MassComponent>
	transFatContent?: Mass | ReturnType<typeof MassComponent>
	unsaturatedFatContent?: Mass | ReturnType<typeof MassComponent>
}

type NutritionInformation =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& NutritionInformationProps

export default NutritionInformation
