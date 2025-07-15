import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type WebContentProps from "../../../../types/Thing/WebContent/index.ts"

import CreativeWork from "./index.tsx"

// WebContent adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	WebContentProps,
	"WebContent",
	ExtractLevelProps<WebContentProps, CreativeWorkProps>
>

export default function WebContent({
	schemaType = "WebContent",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
