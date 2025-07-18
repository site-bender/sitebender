import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type OnlineBusinessProps from "../../../../../types/Thing/OnlineBusiness/index.ts"
import type OnlineStoreProps from "../../../../../types/Thing/OnlineStore/index.ts"

import OnlineBusiness from "../index.tsx"

// OnlineStore adds no properties to the OnlineBusiness schema type
export type Props = BaseComponentProps<
	OnlineStoreProps,
	"OnlineStore",
	ExtractLevelProps<OnlineStoreProps, OnlineBusinessProps>
>

export default function OnlineStore({
	schemaType = "OnlineStore",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<OnlineBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
