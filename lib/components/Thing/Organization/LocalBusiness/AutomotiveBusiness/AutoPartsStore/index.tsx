import type BaseProps from "../../../../../../types/index.ts"
import type { AutoPartsStoreProps } from "../../../../../../types/Thing/Organization/LocalBusiness/AutomotiveBusiness/AutoPartsStore/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = AutoPartsStoreProps & BaseProps

export default function AutoPartsStore({
	_type = "AutoPartsStore",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AutomotiveBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
