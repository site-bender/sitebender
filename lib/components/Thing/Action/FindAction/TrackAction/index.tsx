import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FindActionProps from "../../../../../types/Thing/FindAction/index.ts"
import type TrackActionProps from "../../../../../types/Thing/TrackAction/index.ts"

import FindAction from "./index.tsx"

export type Props = BaseComponentProps<
	TrackActionProps,
	"TrackAction",
	ExtractLevelProps<TrackActionProps, FindActionProps>
>

export default function TrackAction(
	{
		deliveryMethod,
		schemaType = "TrackAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
