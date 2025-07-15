import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MovieRentalStoreProps from "../../../../../../types/Thing/MovieRentalStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "./index.tsx"

// MovieRentalStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	MovieRentalStoreProps,
	"MovieRentalStore",
	ExtractLevelProps<MovieRentalStoreProps, StoreProps>
>

export default function MovieRentalStore({
	schemaType = "MovieRentalStore",
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
