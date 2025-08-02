import type BaseProps from "../../../../../../types/index.ts"
import type PetStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/PetStore/index.ts"

import Store from "../index.tsx"

export type Props = PetStoreProps & BaseProps

export default function PetStore({
	_type = "PetStore",
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
