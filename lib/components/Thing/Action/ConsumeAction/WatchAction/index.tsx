import type BaseProps from "../../../../../types/index.ts"
import type { WatchActionProps } from "../../../../../types/Thing/Action/ConsumeAction/WatchAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = WatchActionProps & BaseProps

export default function WatchAction({
	_type = "WatchAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ConsumeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
