import type BaseProps from "../../../../../types/index.ts"
import type WarrantyScopeProps from "../../../../../types/Thing/Intangible/Enumeration/WarrantyScope/index.ts"

import Enumeration from "../index.tsx"

export type Props = WarrantyScopeProps & BaseProps

export default function WarrantyScope({
	_type = "WarrantyScope",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
