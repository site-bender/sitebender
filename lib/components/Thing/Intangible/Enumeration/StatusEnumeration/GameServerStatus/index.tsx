import type BaseProps from "../../../../../../types/index.ts"
import type GameServerStatusProps from "../../../../../../types/Thing/Intangible/Enumeration/StatusEnumeration/GameServerStatus/index.ts"

import StatusEnumeration from "../index.tsx"

export type Props = GameServerStatusProps & BaseProps

export default function GameServerStatus({
	_type = "GameServerStatus",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StatusEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
