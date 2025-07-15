import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AgreeActionProps from "../../../../../../types/Thing/AgreeAction/index.ts"
import type ReactActionProps from "../../../../../../types/Thing/ReactAction/index.ts"

import ReactAction from "./index.tsx"

// AgreeAction adds no properties to the ReactAction schema type
export type Props = BaseComponentProps<
	AgreeActionProps,
	"AgreeAction",
	ExtractLevelProps<AgreeActionProps, ReactActionProps>
>

export default function AgreeAction({
	schemaType = "AgreeAction",
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
