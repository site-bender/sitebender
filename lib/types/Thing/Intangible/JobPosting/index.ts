import type EducationalOccupationalCredential from "../../CreativeWork/EducationalOccupationalCredential/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Place from "../../Place/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Occupation from "../Occupation/index.ts"
import type OccupationalExperienceRequirements from "../OccupationalExperienceRequirements/index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type MonetaryAmountDistribution from "../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"

export interface JobPostingProps {
	/** The location(s) applicants can apply from. This is usually used for telecommuting jobs where the applicant does not need to be in a physical office. Note: This should not be used for citizenship or work visa requirements. */
	applicantLocationRequirements?: AdministrativeArea
	/** Contact details for further information relevant to this job posting. */
	applicationContact?: ContactPoint
	/** The base salary of the job or of an employee in an EmployeeRole. */
	baseSalary?: PriceSpecification | MonetaryAmount | Number
	/** Description of benefits associated with the job. */
	benefits?: Text
	/** Publication date of an online listing. */
	datePosted?: Date | DateTime
	/** Indicates whether an [[url]] that is associated with a [[JobPosting]] enables direct application for the job, via the posting website. A job posting is considered to have directApply of [[True]] if an application process for the specified job can be directly initiated via the url(s) given (noting that e.g. multiple internet domains might nevertheless be involved at an implementation level). A value of [[False]] is appropriate if there is no clear path to applying directly online for the specified job, navigating directly from the JobPosting url(s) supplied. */
	directApply?: Boolean
	/** Educational background needed for the position or Occupation. */
	educationRequirements?: Text | EducationalOccupationalCredential
	/** The legal requirements such as citizenship, visa and other documentation required for an applicant to this job. */
	eligibilityToWorkRequirement?: Text
	/** A description of the employer, career opportunities and work environment for this position. */
	employerOverview?: Text
	/** Type of employment (e.g. full-time, part-time, contract, temporary, seasonal, internship). */
	employmentType?: Text
	/** Indicates the department, unit and/or facility where the employee reports and/or in which the job is to be performed. */
	employmentUnit?: Organization
	/** An estimated salary for a job posting or occupation, based on a variety of variables including, but not limited to industry, job title, and location. Estimated salaries  are often computed by outside organizations rather than the hiring organization, who may not have committed to the estimated value. */
	estimatedSalary?: MonetaryAmount | MonetaryAmountDistribution | Number
	/** Indicates whether a [[JobPosting]] will accept experience (as indicated by [[OccupationalExperienceRequirements]]) in place of its formal educational qualifications (as indicated by [[educationRequirements]]). If true, indicates that satisfying one of these requirements is sufficient. */
	experienceInPlaceOfEducation?: Boolean
	/** Description of skills and experience needed for the position or Occupation. */
	experienceRequirements?: OccupationalExperienceRequirements | Text
	/** Organization or Person offering the job position. */
	hiringOrganization?: Organization | Person
	/** Description of bonus and commission compensation aspects of the job. */
	incentiveCompensation?: Text
	/** Description of bonus and commission compensation aspects of the job. */
	incentives?: Text
	/** The industry associated with the job position. */
	industry?: DefinedTerm | Text
	/** Description of benefits associated with the job. */
	jobBenefits?: Text
	/** An indicator as to whether a position is available for an immediate start. */
	jobImmediateStart?: Boolean
	/** A (typically single) geographic location associated with the job position. */
	jobLocation?: Place
	/** A description of the job location (e.g. TELECOMMUTE for telecommute jobs). */
	jobLocationType?: Text
	/** The date on which a successful applicant for this job would be expected to start work. Choose a specific date in the future or use the jobImmediateStart property to indicate the position is to be filled as soon as possible. */
	jobStartDate?: Date | Text
	/** A category describing the job, preferably using a term from a taxonomy such as [BLS O*NET-SOC](http://www.onetcenter.org/taxonomy.html), [ISCO-08](https://www.ilo.org/public/english/bureau/stat/isco/isco08/) or similar, with the property repeated for each applicable value. Ideally the taxonomy should be identified, and both the textual label and formal code for the category should be provided.\n Note: for historical reasons, any textual label and formal code provided as a literal may be assumed to be from O*NET-SOC. */
	occupationalCategory?: CategoryCode | Text
	/** A description of the types of physical activity associated with the job. Defined terms such as those in O*net may be used, but note that there is no way to specify the level of ability as well as its nature when using a defined term. */
	physicalRequirement?: URL | Text | DefinedTerm
	/** Specific qualifications required for this role or Occupation. */
	qualifications?: EducationalOccupationalCredential | Text
	/** The Occupation for the JobPosting. */
	relevantOccupation?: Occupation
	/** Responsibilities associated with this role or Occupation. */
	responsibilities?: Text
	/** The currency (coded using [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217)) used for the main salary information in this job posting or for this employee. */
	salaryCurrency?: Text
	/** A description of any security clearance requirements of the job. */
	securityClearanceRequirement?: URL | Text
	/** A description of any sensory requirements and levels necessary to function on the job, including hearing and vision. Defined terms such as those in O*net may be used, but note that there is no way to specify the level of ability as well as its nature when using a defined term. */
	sensoryRequirement?: Text | URL | DefinedTerm
	/** A statement of knowledge, skill, ability, task or any other assertion expressing a competency that is either claimed by a person, an organization or desired or required to fulfill a role or to work in an occupation. */
	skills?: DefinedTerm | Text
	/** Any special commitments associated with this job posting. Valid entries include VeteranCommit, MilitarySpouseCommit, etc. */
	specialCommitments?: Text
	/** The title of the job. */
	title?: Text
	/** The number of positions open for this job posting. Use a positive integer. Do not use if the number of positions is unclear or not known. */
	totalJobOpenings?: Integer
	/** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
	validThrough?: Date | DateTime
	/** The typical working hours for this job (e.g. 1st shift, night shift, 8am-5pm). */
	workHours?: Text
}

type JobPosting =
	& Thing
	& IntangibleProps
	& JobPostingProps

export default JobPosting
