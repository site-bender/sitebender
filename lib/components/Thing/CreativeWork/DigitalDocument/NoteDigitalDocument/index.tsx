import type BaseProps from "../../../../../types/index.ts"
import type { NoteDigitalDocumentProps } from "../../../../../types/Thing/CreativeWork/DigitalDocument/NoteDigitalDocument/index.ts"

import DigitalDocument from "../index.tsx"

export type Props = NoteDigitalDocumentProps & BaseProps

export default function NoteDigitalDocument({
	_type = "NoteDigitalDocument",
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
