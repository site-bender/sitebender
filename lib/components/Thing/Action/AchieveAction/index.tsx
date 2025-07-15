import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type AchieveActionProps from "../../../../types/Thing/AchieveAction/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"

import Action from "./index.tsx"

// AchieveAction adds no properties to the Action schema type
export type Props = BaseComponentProps<
	AchieveActionProps,
	"AchieveAction",
	ExtractLevelProps<AchieveActionProps, ActionProps>
>

export default function AchieveAction({
	schemaType = "AchieveAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
