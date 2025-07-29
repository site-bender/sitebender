import type BaseProps from "../../../../types/index.ts"
import type DigitalDocumentProps from "../../../../types/Thing/CreativeWork/DigitalDocument/index.ts"

import CreativeWork from "../index.tsx"

export type Props = DigitalDocumentProps & BaseProps

export default function DigitalDocument({
	hasDigitalDocumentPermission,
	_type = "DigitalDocument",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				hasDigitalDocumentPermission,
				...subtypeProperties,
			}}
		/>
	)
}
