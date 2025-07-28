import type BaseProps from "../../../../../types/index.ts"
import type { PresentationDigitalDocumentProps } from "../../../../../types/Thing/CreativeWork/DigitalDocument/PresentationDigitalDocument/index.ts"

import DigitalDocument from "../index.tsx"

export type Props = PresentationDigitalDocumentProps & BaseProps

export default function PresentationDigitalDocument({
	_type = "PresentationDigitalDocument",
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
