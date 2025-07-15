import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AchieveActionProps from "../../../../../types/Thing/AchieveAction/index.ts"
import type TieActionProps from "../../../../../types/Thing/TieAction/index.ts"

import AchieveAction from "./index.tsx"

// TieAction adds no properties to the AchieveAction schema type
export type Props = BaseComponentProps<
	TieActionProps,
	"TieAction",
	ExtractLevelProps<TieActionProps, AchieveActionProps>
>

export default function TieAction({
	schemaType = "TieAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AchieveAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
