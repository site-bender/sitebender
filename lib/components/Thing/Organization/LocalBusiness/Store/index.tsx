import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type StoreProps from "../../../../../types/Thing/Store/index.ts"

import LocalBusiness from "../index.tsx"

// Store adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	StoreProps,
	"Store",
	ExtractLevelProps<StoreProps, LocalBusinessProps>
>

export default function Store({
	schemaType = "Store",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
