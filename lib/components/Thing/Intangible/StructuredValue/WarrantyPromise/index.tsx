import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { WarrantyPromiseProps } from "../../../../../types/Thing/Intangible/StructuredValue/WarrantyPromise/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	WarrantyPromiseProps,
	"WarrantyPromise",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function WarrantyPromise({
	durationOfWarranty,
	warrantyScope,
	schemaType = "WarrantyPromise",
	subtypeProperties = {},
	...props
}): Props {
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
