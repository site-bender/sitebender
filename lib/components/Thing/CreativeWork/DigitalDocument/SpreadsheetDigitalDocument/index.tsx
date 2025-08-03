import type BaseProps from "../../../../../types/index.ts"
import type { SpreadsheetDigitalDocument as SpreadsheetDigitalDocumentProps } from "../../../../../types/index.ts"

import DigitalDocument from "../index.tsx"

export type Props = SpreadsheetDigitalDocumentProps & BaseProps

export default function SpreadsheetDigitalDocument({
	_type = "SpreadsheetDigitalDocument",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
