import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type FloristProps from "../../../../../../types/Thing/Florist/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "./index.tsx"

// Florist adds no properties to the Store schema type
export type Props = BaseComponentProps<
	FloristProps,
	"Florist",
	ExtractLevelProps<FloristProps, StoreProps>
>

export default function Florist({
	schemaType = "Florist",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Store
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
