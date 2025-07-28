import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { DigitalDocumentProps } from "../../../../types/Thing/CreativeWork/DigitalDocument/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	DigitalDocumentProps,
	"DigitalDocument",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function DigitalDocument({
	hasDigitalDocumentPermission,
	schemaType = "DigitalDocument",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasDigitalDocumentPermission,
				...subtypeProperties,
			}}
		/>
	)
}
