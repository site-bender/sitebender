import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DigitalDocumentProps from "../../../../../types/Thing/DigitalDocument/index.ts"
import type SpreadsheetDigitalDocumentProps from "../../../../../types/Thing/SpreadsheetDigitalDocument/index.ts"

import DigitalDocument from "./index.tsx"

// SpreadsheetDigitalDocument adds no properties to the DigitalDocument schema type
export type Props = BaseComponentProps<
	SpreadsheetDigitalDocumentProps,
	"SpreadsheetDigitalDocument",
	ExtractLevelProps<SpreadsheetDigitalDocumentProps, DigitalDocumentProps>
>

export default function SpreadsheetDigitalDocument({
	schemaType = "SpreadsheetDigitalDocument",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<DigitalDocument
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
