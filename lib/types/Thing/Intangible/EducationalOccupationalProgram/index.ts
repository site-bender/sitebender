import {
	Date,
	DateTime,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import Course from "../../CreativeWork/Course/index.ts"
import EducationalOccupationalCredential from "../../CreativeWork/EducationalOccupationalCredential/index.ts"
import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import AlignmentObject from "../AlignmentObject/index.ts"
import CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import DefinedTerm from "../DefinedTerm/index.ts"
import Demand from "../Demand/index.ts"
import DayOfWeek from "../Enumeration/DayOfWeek/index.ts"
import Intangible from "../index.ts"
import Offer from "../Offer/index.ts"
import Duration from "../Quantity/Duration/index.ts"
import StructuredValue from "../StructuredValue/index.ts"
import MonetaryAmountDistribution from "../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"

export default interface EducationalOccupationalProgram extends Intangible {
	/** The date on which the program stops collecting applications for the next enrollment cycle. Flexible application deadlines (for example, a program with rolling admissions) can be described in a textual string, rather than as a DateTime. */
	applicationDeadline?: Date | Text
	/** The date at which the program begins collecting applications for the next enrollment cycle. */
	applicationStartDate?: Date
	/** The day of the week for which these opening hours are valid. */
	dayOfWeek?: DayOfWeek
	/** A description of the qualification, award, certificate, diploma or other educational credential awarded as a consequence of successful completion of this course or program. */
	educationalCredentialAwarded?: EducationalOccupationalCredential | Text | URL
	/** Similar to courseMode, the medium or means of delivery of the program as a whole. The value may either be a text label (e.g. "online", "onsite" or "blended"; "synchronous" or "asynchronous"; "full-time" or "part-time") or a URL reference to a term from a controlled vocabulary (e.g. https://ceds.ed.gov/element/001311#Asynchronous ). */
	educationalProgramMode?: Text | URL
	/** The end date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
	endDate?: Date | DateTime
	/** A financial aid type or program which students may use to pay for tuition or fees associated with the program. */
	financialAidEligible?: Text | DefinedTerm
	/** A course or class that is one of the learning opportunities that constitute an educational / occupational program. No information is implied about whether the course is mandatory or optional; no guarantee is implied about whether the course will be available to everyone on the program. */
	hasCourse?: Course
	/** The maximum number of students who may be enrolled in the program. */
	maximumEnrollment?: Integer
	/** The number of credits or units awarded by a Course or required to complete an EducationalOccupationalProgram. */
	numberOfCredits?: StructuredValue | Integer
	/** A category describing the job, preferably using a term from a taxonomy such as [BLS O*NET-SOC](http://www.onetcenter.org/taxonomy.html), [ISCO-08](https://www.ilo.org/public/english/bureau/stat/isco/isco08/) or similar, with the property repeated for each applicable value. Ideally the taxonomy should be identified, and both the textual label and formal code for the category should be provided.\n Note: for historical reasons, any textual label and formal code provided as a literal may be assumed to be from O*NET-SOC. */
	occupationalCategory?: CategoryCode | Text
	/** A description of the qualification, award, certificate, diploma or other occupational credential awarded as a consequence of successful completion of this course or program. */
	occupationalCredentialAwarded?: EducationalOccupationalCredential | Text | URL
	/** An offer to provide this item&#x2014;for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
	offers?: Demand | Offer
	/** Prerequisites for enrolling in the program. */
	programPrerequisites?:
		| EducationalOccupationalCredential
		| Text
		| AlignmentObject
		| Course
	/** The type of educational or occupational program. For example, classroom, internship, alternance, etc. */
	programType?: DefinedTerm | Text
	/** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
	provider?: Organization | Person
	/** The expected salary upon completing the training. */
	salaryUponCompletion?: MonetaryAmountDistribution
	/** The start date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
	startDate?: Date | DateTime
	/** The amount of time in a term as defined by the institution. A term is a length of time where students take one or more classes. Semesters and quarters are common units for term. */
	termDuration?: Duration
	/** The number of times terms of study are offered per year. Semesters and quarters are common units for term. For example, if the student can only take 2 semesters for the program in one year, then termsPerYear should be 2. */
	termsPerYear?: Number
	/** The time of day the program normally runs. For example, "evenings". */
	timeOfDay?: Text
	/** The expected length of time to complete the program if attending full-time. */
	timeToComplete?: Duration
	/** The estimated salary earned while in the program. */
	trainingSalary?: MonetaryAmountDistribution
	/** The number of credits or units a full-time student would be expected to take in 1 term however 'term' is defined by the institution. */
	typicalCreditsPerTerm?: Integer | StructuredValue
}
