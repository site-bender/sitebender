import type BaseProps from "../../../../../../types/index.ts"
import type ElectronicsStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/ElectronicsStore/index.ts"

import Store from "../index.tsx"

export type Props = ElectronicsStoreProps & BaseProps

export default function ElectronicsStore({
	_type = "ElectronicsStore",
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
