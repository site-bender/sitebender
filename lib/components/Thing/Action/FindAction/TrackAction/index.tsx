import type BaseProps from "../../../../../types/index.ts"
import type TrackActionProps from "../../../../../types/Thing/Action/FindAction/TrackAction/index.ts"

import FindAction from "../index.tsx"

export type Props = TrackActionProps & BaseProps

export default function TrackAction({
	deliveryMethod,
	_type = "TrackAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<FindAction
			{...props}
			_type={_type}
			subtypeProperties={{
				deliveryMethod,
				...subtypeProperties,
			}}
		/>
	)
}
