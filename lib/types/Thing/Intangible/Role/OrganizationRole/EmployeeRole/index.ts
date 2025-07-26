import type { Number, Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { RoleProps } from "../../index.ts"
import type { OrganizationRoleProps } from "../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type PriceSpecification from "../../../StructuredValue/PriceSpecification/index.ts"

export interface EmployeeRoleProps {
	baseSalary?: MonetaryAmount | Number | PriceSpecification
	salaryCurrency?: Text
}

type EmployeeRole =
	& Thing
	& IntangibleProps
	& RoleProps
	& OrganizationRoleProps
	& EmployeeRoleProps

export default EmployeeRole
