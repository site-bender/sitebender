import { Text } from "../../../../DataType/index.ts"
import CategoryCode from "../../DefinedTerm/CategoryCode/index.ts"
import MonetaryAmountDistribution from "../../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"
import EducationalOccupationalProgram from "../index.ts"

export default interface WorkBasedProgram
	extends EducationalOccupationalProgram {
	/** A category describing the job, preferably using a term from a taxonomy such as [BLS O*NET-SOC](http://www.onetcenter.org/taxonomy.html), [ISCO-08](https://www.ilo.org/public/english/bureau/stat/isco/isco08/) or similar, with the property repeated for each applicable value. Ideally the taxonomy should be identified, and both the textual label and formal code for the category should be provided.\n Note: for historical reasons, any textual label and formal code provided as a literal may be assumed to be from O*NET-SOC. */
	occupationalCategory?: CategoryCode | Text
	/** The estimated salary earned while in the program. */
	trainingSalary?: MonetaryAmountDistribution
}
