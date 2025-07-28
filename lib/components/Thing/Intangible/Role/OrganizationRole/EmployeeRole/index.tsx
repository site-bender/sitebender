import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { RoleProps } from "../../../../../../types/Thing/Intangible/Role/index.ts"
import type { OrganizationRoleProps } from "../../../../../../types/Thing/Intangible/Role/OrganizationRole/index.ts"
import type { EmployeeRoleProps } from "../../../../../../types/Thing/Intangible/Role/OrganizationRole/EmployeeRole/index.ts"

import OrganizationRole from "../index.tsx"

export type Props = BaseComponentProps<
	EmployeeRoleProps,
	"EmployeeRole",
	ExtractLevelProps<ThingProps, IntangibleProps, RoleProps, OrganizationRoleProps>
>

export default function EmployeeRole({
	baseSalary,
	salaryCurrency,
	schemaType = "EmployeeRole",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<OrganizationRole
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				baseSalary,
				salaryCurrency,
				...subtypeProperties,
			}}
		/>
	)
}
