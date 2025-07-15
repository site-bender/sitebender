import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DigitalDocumentProps from "../../../../../types/Thing/DigitalDocument/index.ts"
import type NoteDigitalDocumentProps from "../../../../../types/Thing/NoteDigitalDocument/index.ts"

import DigitalDocument from "./index.tsx"

// NoteDigitalDocument adds no properties to the DigitalDocument schema type
export type Props = BaseComponentProps<
	NoteDigitalDocumentProps,
	"NoteDigitalDocument",
	ExtractLevelProps<NoteDigitalDocumentProps, DigitalDocumentProps>
>

export default function NoteDigitalDocument({
	schemaType = "NoteDigitalDocument",
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
