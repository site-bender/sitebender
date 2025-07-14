import { Number, Text } from "../../../../../DataType/index.ts"
import MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import PriceSpecification from "../../../StructuredValue/PriceSpecification/index.ts"
import OrganizationRole from "../index.ts"

export default interface EmployeeRole extends OrganizationRole {
	/** The base salary of the job or of an employee in an EmployeeRole. */
	baseSalary?: PriceSpecification | MonetaryAmount | Number
	/** The currency (coded using [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217)) used for the main salary information in this job posting or for this employee. */
	salaryCurrency?: Text
}
