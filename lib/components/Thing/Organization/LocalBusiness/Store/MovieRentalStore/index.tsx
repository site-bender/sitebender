import type BaseProps from "../../../../../../types/index.ts"
import type MovieRentalStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/MovieRentalStore/index.ts"

import Store from "../index.tsx"

export type Props = MovieRentalStoreProps & BaseProps

export default function MovieRentalStore({
	_type = "MovieRentalStore",
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
