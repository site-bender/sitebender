import type BaseProps from "../../../../../types/index.ts"
import type ItemPageProps from "../../../../../types/Thing/CreativeWork/WebPage/ItemPage/index.ts"

import WebPage from "../index.tsx"

export type Props = ItemPageProps & BaseProps

export default function ItemPage({
	_type = "ItemPage",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<WebPage
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
