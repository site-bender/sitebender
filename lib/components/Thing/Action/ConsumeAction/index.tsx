import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type ConsumeActionProps from "../../../../types/Thing/ConsumeAction/index.ts"

import Action from "../index.tsx"

export type Props = BaseComponentProps<
	ConsumeActionProps,
	"ConsumeAction",
	ExtractLevelProps<ConsumeActionProps, ActionProps>
>

export default function ConsumeAction(
	{
		actionAccessibilityRequirement,
		expectsAcceptanceOf,
		schemaType = "ConsumeAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				actionAccessibilityRequirement,
				expectsAcceptanceOf,
				...subtypeProperties,
			}}
		/>
	)
}
