import type Thing from "../../index.ts"
import type Class from "../Class/index.ts"
import type { IntangibleProps } from "../index.ts"

import ClassComponent from "../../../../components/Thing/Intangible/Class/index.ts"

export interface StatisticalPopulationProps {
	"@type"?: "StatisticalPopulation"
	populationType?: Class | ReturnType<typeof ClassComponent>
}

type StatisticalPopulation =
	& Thing
	& IntangibleProps
	& StatisticalPopulationProps

export default StatisticalPopulation
