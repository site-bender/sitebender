import type BaseProps from "../../../../../types/index.ts"
import type { BreadcrumbListProps } from "../../../../../types/Thing/Intangible/ItemList/BreadcrumbList/index.ts"

import ItemList from "../index.tsx"

export type Props = BreadcrumbListProps & BaseProps

export default function BreadcrumbList({
	_type = "BreadcrumbList",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ItemList
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
