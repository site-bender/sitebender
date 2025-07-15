import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MassProps from "../../../../../types/Thing/Mass/index.ts"
import type QuantityProps from "../../../../../types/Thing/Quantity/index.ts"

import Quantity from "./index.tsx"

// Mass adds no properties to the Quantity schema type
export type Props = BaseComponentProps<
	MassProps,
	"Mass",
	ExtractLevelProps<MassProps, QuantityProps>
>

export default function Mass({
	schemaType = "Mass",
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
