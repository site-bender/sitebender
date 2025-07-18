import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DurationProps from "../../../../../types/Thing/Duration/index.ts"
import type QuantityProps from "../../../../../types/Thing/Quantity/index.ts"

import Quantity from "../index.tsx"

// Duration adds no properties to the Quantity schema type
export type Props = BaseComponentProps<
	DurationProps,
	"Duration",
	ExtractLevelProps<DurationProps, QuantityProps>
>

export default function Duration({
	schemaType = "Duration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Quantity
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
