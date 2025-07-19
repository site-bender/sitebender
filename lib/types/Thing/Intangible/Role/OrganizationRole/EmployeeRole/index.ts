import type { Number, Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type PriceSpecification from "../../../StructuredValue/PriceSpecification/index.ts"
import type { RoleProps } from "../../index.ts"
import type { OrganizationRoleProps } from "../index.ts"

export interface EmployeeRoleProps {
	/** The base salary of the job or of an employee in an EmployeeRole. */
	baseSalary?: PriceSpecification | MonetaryAmount | Number
	/** The currency (coded using [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217)) used for the main salary information in this job posting or for this employee. */
	salaryCurrency?: Text
}

type EmployeeRole =
	& Thing
	& IntangibleProps
	& OrganizationRoleProps
	& RoleProps
	& EmployeeRoleProps

export default EmployeeRole
