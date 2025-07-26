import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Class from "../Class/index.ts"

export interface StatisticalPopulationProps {
	populationType?: Class
}

type StatisticalPopulation =
	& Thing
	& IntangibleProps
	& StatisticalPopulationProps

export default StatisticalPopulation
