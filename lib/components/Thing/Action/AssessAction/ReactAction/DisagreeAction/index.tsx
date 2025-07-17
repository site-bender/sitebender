import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DisagreeActionProps from "../../../../../../types/Thing/DisagreeAction/index.ts"
import type ReactActionProps from "../../../../../../types/Thing/ReactAction/index.ts"

import ReactAction from "../index.tsx"

// DisagreeAction adds no properties to the ReactAction schema type
export type Props = BaseComponentProps<
	DisagreeActionProps,
	"DisagreeAction",
	ExtractLevelProps<DisagreeActionProps, ReactActionProps>
>

export default function DisagreeAction({
	schemaType = "DisagreeAction",
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
