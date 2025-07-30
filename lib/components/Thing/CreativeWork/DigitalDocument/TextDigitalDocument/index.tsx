import type BaseProps from "../../../../../types/index.ts"
import type TextDigitalDocumentProps from "../../../../../types/Thing/CreativeWork/DigitalDocument/TextDigitalDocument/index.ts"

import DigitalDocument from "../index.tsx"

export type Props = TextDigitalDocumentProps & BaseProps

export default function TextDigitalDocument({
	_type = "TextDigitalDocument",
	children,
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
		>{children}</DigitalDocument>
	)
}
