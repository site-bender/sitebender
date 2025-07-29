import type BaseProps from "../../../../../types/index.ts"
import type GovernmentOfficeProps from "../../../../../types/Thing/Organization/LocalBusiness/GovernmentOffice/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = GovernmentOfficeProps & BaseProps

export default function GovernmentOffice({
	_type = "GovernmentOffice",
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
