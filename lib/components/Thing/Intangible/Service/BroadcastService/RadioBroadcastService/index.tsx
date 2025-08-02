import type BaseProps from "../../../../../../types/index.ts"
import type RadioBroadcastServiceProps from "../../../../../../types/Thing/Intangible/Service/BroadcastService/RadioBroadcastService/index.ts"

import BroadcastService from "../index.tsx"

export type Props = RadioBroadcastServiceProps & BaseProps

export default function RadioBroadcastService({
	_type = "RadioBroadcastService",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<BroadcastService
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</BroadcastService>
	)
}
