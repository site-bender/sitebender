import type BaseProps from "../../../../../types/index.ts"
import type DiscoverActionProps from "../../../../../types/Thing/Action/FindAction/DiscoverAction/index.ts"

import FindAction from "../index.tsx"

export type Props = DiscoverActionProps & BaseProps

export default function DiscoverAction({
	_type = "DiscoverAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<FindAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
