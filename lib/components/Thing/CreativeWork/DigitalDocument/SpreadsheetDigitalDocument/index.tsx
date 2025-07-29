import type BaseProps from "../../../../../types/index.ts"
import type SpreadsheetDigitalDocumentProps from "../../../../../types/Thing/CreativeWork/DigitalDocument/SpreadsheetDigitalDocument/index.ts"

import DigitalDocument from "../index.tsx"

export type Props = SpreadsheetDigitalDocumentProps & BaseProps

export default function SpreadsheetDigitalDocument({
	_type = "SpreadsheetDigitalDocument",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<DigitalDocument
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
