import type BaseProps from "../../../../../../types/index.ts"
import type { DepartmentStoreProps } from "../../../../../../types/Thing/Organization/LocalBusiness/Store/DepartmentStore/index.ts"

import Store from "../index.tsx"

export type Props = DepartmentStoreProps & BaseProps

export default function DepartmentStore({
	_type = "DepartmentStore",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Store
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
