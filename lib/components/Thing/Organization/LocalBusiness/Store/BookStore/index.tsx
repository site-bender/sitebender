import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BookStoreProps from "../../../../../../types/Thing/BookStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// BookStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	BookStoreProps,
	"BookStore",
	ExtractLevelProps<BookStoreProps, StoreProps>
>

export default function BookStore({
	schemaType = "BookStore",
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
