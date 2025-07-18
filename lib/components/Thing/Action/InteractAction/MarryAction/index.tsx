import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type InteractActionProps from "../../../../../types/Thing/InteractAction/index.ts"
import type MarryActionProps from "../../../../../types/Thing/MarryAction/index.ts"

import InteractAction from "../index.tsx"

// MarryAction adds no properties to the InteractAction schema type
export type Props = BaseComponentProps<
	MarryActionProps,
	"MarryAction",
	ExtractLevelProps<MarryActionProps, InteractActionProps>
>

export default function MarryAction({
	schemaType = "MarryAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<InteractAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
