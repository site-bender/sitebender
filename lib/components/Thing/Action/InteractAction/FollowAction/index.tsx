import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FollowActionProps from "../../../../../types/Thing/FollowAction/index.ts"
import type InteractActionProps from "../../../../../types/Thing/InteractAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = BaseComponentProps<
	FollowActionProps,
	"FollowAction",
	ExtractLevelProps<FollowActionProps, InteractActionProps>
>

export default function FollowAction(
	{
		followee,
		schemaType = "FollowAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<InteractAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				followee,
				...subtypeProperties,
			}}
		/>
	)
}
