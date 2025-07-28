import type BaseProps from "../../../../../../types/index.ts"
import type { AutoBodyShopProps } from "../../../../../../types/Thing/Organization/LocalBusiness/AutomotiveBusiness/AutoBodyShop/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = AutoBodyShopProps & BaseProps

export default function AutoBodyShop({
	_type = "AutoBodyShop",
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
