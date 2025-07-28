import type BaseProps from "../../../../../types/index.ts"
import type { ItemListOrderTypeProps } from "../../../../../types/Thing/Intangible/Enumeration/ItemListOrderType/index.ts"

import Enumeration from "../index.tsx"

export type Props = ItemListOrderTypeProps & BaseProps

export default function ItemListOrderType({
	_type = "ItemListOrderType",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
