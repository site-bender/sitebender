import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ConsumeActionProps from "../../../../../types/Thing/ConsumeAction/index.ts"
import type DrinkActionProps from "../../../../../types/Thing/DrinkAction/index.ts"

import ConsumeAction from "./index.tsx"

// DrinkAction adds no properties to the ConsumeAction schema type
export type Props = BaseComponentProps<
	DrinkActionProps,
	"DrinkAction",
	ExtractLevelProps<DrinkActionProps, ConsumeActionProps>
>

export default function DrinkAction({
	schemaType = "DrinkAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ConsumeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
