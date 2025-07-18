import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type TableProps from "../../../../../types/Thing/Table/index.ts"
import type WebPageElementProps from "../../../../../types/Thing/WebPageElement/index.ts"

import WebPageElement from "../index.tsx"

// Table adds no properties to the WebPageElement schema type
export type Props = BaseComponentProps<
	TableProps,
	"Table",
	ExtractLevelProps<TableProps, WebPageElementProps>
>

export default function Table({
	schemaType = "Table",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<WebPageElement
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
