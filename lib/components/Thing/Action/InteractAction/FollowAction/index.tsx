import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { InteractActionProps } from "../../../../../types/Thing/Action/InteractAction/index.ts"
import type { FollowActionProps } from "../../../../../types/Thing/Action/InteractAction/FollowAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = BaseComponentProps<
	FollowActionProps,
	"FollowAction",
	ExtractLevelProps<ThingProps, ActionProps, InteractActionProps>
>

export default function FollowAction({
	followee,
	schemaType = "FollowAction",
	subtypeProperties = {},
	...props
}): Props {
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
