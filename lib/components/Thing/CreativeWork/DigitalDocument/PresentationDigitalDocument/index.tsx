import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DigitalDocumentProps from "../../../../../types/Thing/DigitalDocument/index.ts"
import type PresentationDigitalDocumentProps from "../../../../../types/Thing/PresentationDigitalDocument/index.ts"

import DigitalDocument from "./index.tsx"

// PresentationDigitalDocument adds no properties to the DigitalDocument schema type
export type Props = BaseComponentProps<
	PresentationDigitalDocumentProps,
	"PresentationDigitalDocument",
	ExtractLevelProps<PresentationDigitalDocumentProps, DigitalDocumentProps>
>

export default function PresentationDigitalDocument({
	schemaType = "PresentationDigitalDocument",
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
