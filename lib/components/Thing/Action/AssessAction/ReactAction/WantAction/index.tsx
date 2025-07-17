import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ReactActionProps from "../../../../../../types/Thing/ReactAction/index.ts"
import type WantActionProps from "../../../../../../types/Thing/WantAction/index.ts"

import ReactAction from "../index.tsx"

// WantAction adds no properties to the ReactAction schema type
export type Props = BaseComponentProps<
	WantActionProps,
	"WantAction",
	ExtractLevelProps<WantActionProps, ReactActionProps>
>

export default function WantAction({
	schemaType = "WantAction",
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
