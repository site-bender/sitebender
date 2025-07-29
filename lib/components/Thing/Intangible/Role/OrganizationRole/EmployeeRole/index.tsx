import type BaseProps from "../../../../../../types/index.ts"
import type EmployeeRoleProps from "../../../../../../types/Thing/Intangible/Role/OrganizationRole/EmployeeRole/index.ts"

import OrganizationRole from "../index.tsx"

export type Props = EmployeeRoleProps & BaseProps

export default function EmployeeRole({
	baseSalary,
	salaryCurrency,
	_type = "EmployeeRole",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<OrganizationRole
			{...props}
			_type={_type}
			subtypeProperties={{
				baseSalary,
				salaryCurrency,
				...subtypeProperties,
			}}
		/>
	)
}
