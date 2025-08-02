import type BaseProps from "../../../../../../types/index.ts"
import type BookStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/BookStore/index.ts"

import Store from "../index.tsx"

export type Props = BookStoreProps & BaseProps

export default function BookStore({
	_type = "BookStore",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Store
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Store>
	)
}
