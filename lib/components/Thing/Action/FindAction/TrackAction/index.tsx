import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { FindActionProps } from "../../../../../types/Thing/Action/FindAction/index.ts"
import type { TrackActionProps } from "../../../../../types/Thing/Action/FindAction/TrackAction/index.ts"

import FindAction from "../index.tsx"

export type Props = BaseComponentProps<
	TrackActionProps,
	"TrackAction",
	ExtractLevelProps<ThingProps, ActionProps, FindActionProps>
>

export default function TrackAction({
	deliveryMethod,
	schemaType = "TrackAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<FindAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				deliveryMethod,
				...subtypeProperties,
			}}
		/>
	)
}
