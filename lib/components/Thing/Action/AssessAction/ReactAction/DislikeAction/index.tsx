import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DislikeActionProps from "../../../../../../types/Thing/DislikeAction/index.ts"
import type ReactActionProps from "../../../../../../types/Thing/ReactAction/index.ts"

import ReactAction from "./index.tsx"

// DislikeAction adds no properties to the ReactAction schema type
export type Props = BaseComponentProps<
	DislikeActionProps,
	"DislikeAction",
	ExtractLevelProps<DislikeActionProps, ReactActionProps>
>

export default function DislikeAction({
	schemaType = "DislikeAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ReactAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
