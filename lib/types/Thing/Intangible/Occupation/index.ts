import { Number, Text } from "../../../DataType/index.ts"
import EducationalOccupationalCredential from "../../CreativeWork/EducationalOccupationalCredential/index.ts"
import AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import DefinedTerm from "../DefinedTerm/index.ts"
import Intangible from "../index.ts"
import OccupationalExperienceRequirements from "../OccupationalExperienceRequirements/index.ts"
import MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import MonetaryAmountDistribution from "../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"

export default interface Occupation extends Intangible {
	/** Educational background needed for the position or Occupation. */
	educationRequirements?: Text | EducationalOccupationalCredential
	/** An estimated salary for a job posting or occupation, based on a variety of variables including, but not limited to industry, job title, and location. Estimated salaries  are often computed by outside organizations rather than the hiring organization, who may not have committed to the estimated value. */
	estimatedSalary?: MonetaryAmount | MonetaryAmountDistribution | Number
	/** Description of skills and experience needed for the position or Occupation. */
	experienceRequirements?: OccupationalExperienceRequirements | Text
	/** The region/country for which this occupational description is appropriate. Note that educational requirements and qualifications can vary between jurisdictions. */
	occupationLocation?: AdministrativeArea
	/** A category describing the job, preferably using a term from a taxonomy such as [BLS O*NET-SOC](http://www.onetcenter.org/taxonomy.html), [ISCO-08](https://www.ilo.org/public/english/bureau/stat/isco/isco08/) or similar, with the property repeated for each applicable value. Ideally the taxonomy should be identified, and both the textual label and formal code for the category should be provided.\n Note: for historical reasons, any textual label and formal code provided as a literal may be assumed to be from O*NET-SOC. */
	occupationalCategory?: CategoryCode | Text
	/** Specific qualifications required for this role or Occupation. */
	qualifications?: EducationalOccupationalCredential | Text
	/** Responsibilities associated with this role or Occupation. */
	responsibilities?: Text
	/** A statement of knowledge, skill, ability, task or any other assertion expressing a competency that is either claimed by a person, an organization or desired or required to fulfill a role or to work in an occupation. */
	skills?: DefinedTerm | Text
}
