import type Thing from "../../index.ts"
import type Class from "../Class/index.ts"
import type { IntangibleProps } from "../index.ts"

import ClassComponent from "../../../../../../codewright/src/define/Thing/Intangible/Class/index.tsx"

export type StatisticalPopulationType = "StatisticalPopulation"

export interface StatisticalPopulationProps {
	"@type"?: StatisticalPopulationType
	populationType?: Class | ReturnType<typeof ClassComponent>
}

type StatisticalPopulation =
	& Thing
	& IntangibleProps
	& StatisticalPopulationProps

export default StatisticalPopulation
