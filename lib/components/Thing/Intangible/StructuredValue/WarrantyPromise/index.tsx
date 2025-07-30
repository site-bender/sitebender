import type BaseProps from "../../../../../types/index.ts"
import type WarrantyPromiseProps from "../../../../../types/Thing/Intangible/StructuredValue/WarrantyPromise/index.ts"

import StructuredValue from "../index.tsx"

export type Props = WarrantyPromiseProps & BaseProps

export default function WarrantyPromise({
	durationOfWarranty,
	warrantyScope,
	_type = "WarrantyPromise",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				durationOfWarranty,
				warrantyScope,
				...subtypeProperties,
			}}
		>{children}</StructuredValue>
	)
}
