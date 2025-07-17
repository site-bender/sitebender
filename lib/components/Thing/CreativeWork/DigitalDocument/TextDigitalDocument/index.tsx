import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DigitalDocumentProps from "../../../../../types/Thing/DigitalDocument/index.ts"
import type TextDigitalDocumentProps from "../../../../../types/Thing/TextDigitalDocument/index.ts"

import DigitalDocument from "../index.tsx"

// TextDigitalDocument adds no properties to the DigitalDocument schema type
export type Props = BaseComponentProps<
	TextDigitalDocumentProps,
	"TextDigitalDocument",
	ExtractLevelProps<TextDigitalDocumentProps, DigitalDocumentProps>
>

export default function TextDigitalDocument({
	schemaType = "TextDigitalDocument",
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
