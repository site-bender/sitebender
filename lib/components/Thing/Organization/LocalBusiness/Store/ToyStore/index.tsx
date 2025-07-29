import type BaseProps from "../../../../../../types/index.ts"
import type ToyStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/ToyStore/index.ts"

import Store from "../index.tsx"

export type Props = ToyStoreProps & BaseProps

export default function ToyStore({
	_type = "ToyStore",
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
		/>
	)
}
