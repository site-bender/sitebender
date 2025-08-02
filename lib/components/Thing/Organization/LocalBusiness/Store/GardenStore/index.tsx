import type BaseProps from "../../../../../../types/index.ts"
import type GardenStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/GardenStore/index.ts"

import Store from "../index.tsx"

export type Props = GardenStoreProps & BaseProps

export default function GardenStore({
	_type = "GardenStore",
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
