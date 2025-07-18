import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"
import type WarrantyPromiseProps from "../../../../../types/Thing/WarrantyPromise/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	WarrantyPromiseProps,
	"WarrantyPromise",
	ExtractLevelProps<WarrantyPromiseProps, StructuredValueProps>
>

export default function WarrantyPromise(
	{
		durationOfWarranty,
		warrantyScope,
		schemaType = "WarrantyPromise",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				durationOfWarranty,
				warrantyScope,
				...subtypeProperties,
			}}
		/>
	)
}
