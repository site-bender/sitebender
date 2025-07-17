import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MusicStoreProps from "../../../../../../types/Thing/MusicStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// MusicStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	MusicStoreProps,
	"MusicStore",
	ExtractLevelProps<MusicStoreProps, StoreProps>
>

export default function MusicStore({
	schemaType = "MusicStore",
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
