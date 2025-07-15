import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type ConfirmActionProps from "../../../../../../../types/Thing/ConfirmAction/index.ts"
import type InformActionProps from "../../../../../../../types/Thing/InformAction/index.ts"

import InformAction from "./index.tsx"

// ConfirmAction adds no properties to the InformAction schema type
export type Props = BaseComponentProps<
	ConfirmActionProps,
	"ConfirmAction",
	ExtractLevelProps<ConfirmActionProps, InformActionProps>
>

export default function ConfirmAction({
	schemaType = "ConfirmAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<InformAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
