import type BaseProps from "../../../../../../types/index.ts"
import type ComputerStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/ComputerStore/index.ts"

import Store from "../index.tsx"

export type Props = ComputerStoreProps & BaseProps

export default function ComputerStore({
	_type = "ComputerStore",
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
