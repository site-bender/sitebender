import type BaseProps from "../../../../../types/index.ts"
import type { PerformActionProps } from "../../../../../types/Thing/Action/PlayAction/PerformAction/index.ts"

import PlayAction from "../index.tsx"

export type Props = PerformActionProps & BaseProps

export default function PerformAction({
	entertainmentBusiness,
	_type = "PerformAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PlayAction
			{...props}
			_type={_type}
			subtypeProperties={{
				entertainmentBusiness,
				...subtypeProperties,
			}}
		/>
	)
}
