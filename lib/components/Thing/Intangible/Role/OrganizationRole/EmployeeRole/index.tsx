import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type EmployeeRoleProps from "../../../../../../types/Thing/EmployeeRole/index.ts"
import type OrganizationRoleProps from "../../../../../../types/Thing/OrganizationRole/index.ts"

import OrganizationRole from "./index.tsx"

export type Props = BaseComponentProps<
	EmployeeRoleProps,
	"EmployeeRole",
	ExtractLevelProps<EmployeeRoleProps, OrganizationRoleProps>
>

export default function EmployeeRole(
	{
		baseSalary,
		salaryCurrency,
		schemaType = "EmployeeRole",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
