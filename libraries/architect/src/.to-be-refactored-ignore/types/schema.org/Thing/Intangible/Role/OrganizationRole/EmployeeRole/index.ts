import type { Number, Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type PriceSpecification from "../../../StructuredValue/PriceSpecification/index.ts"
import type { RoleProps } from "../../index.ts"
import type { OrganizationRoleProps } from "../index.ts"

import MonetaryAmountComponent from "../../../../../../../src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"
import PriceSpecificationComponent from "../../../../../../../src/define/Thing/Intangible/StructuredValue/PriceSpecification/index.tsx"

export type EmployeeRoleType = "EmployeeRole"

export interface EmployeeRoleProps {
	"@type"?: EmployeeRoleType
	baseSalary?:
		| MonetaryAmount
		| Number
		| PriceSpecification
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof PriceSpecificationComponent>
	salaryCurrency?: Text
}

type EmployeeRole =
	& Thing
	& IntangibleProps
	& RoleProps
	& OrganizationRoleProps
	& EmployeeRoleProps

export default EmployeeRole
