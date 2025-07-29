import type BaseProps from "../../../../../types/index.ts"
import type TableProps from "../../../../../types/Thing/CreativeWork/WebPageElement/Table/index.ts"

import WebPageElement from "../index.tsx"

export type Props = TableProps & BaseProps

export default function Table({
	_type = "Table",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<WebPageElement
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
