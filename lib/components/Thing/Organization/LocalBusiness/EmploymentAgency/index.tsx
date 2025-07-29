import type BaseProps from "../../../../../types/index.ts"
import type EmploymentAgencyProps from "../../../../../types/Thing/Organization/LocalBusiness/EmploymentAgency/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = EmploymentAgencyProps & BaseProps

export default function EmploymentAgency({
	_type = "EmploymentAgency",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
