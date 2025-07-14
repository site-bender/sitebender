import Class from "../Class/index.ts"
import Intangible from "../index.ts"

export default interface StatisticalPopulation extends Intangible {
	/** Indicates the populationType common to all members of a [[StatisticalPopulation]] or all cases within the scope of a [[StatisticalVariable]]. */
	populationType?: Class
}
