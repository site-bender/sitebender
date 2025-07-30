import type BaseProps from "../../../../types/index.ts"
import type GameServerProps from "../../../../types/Thing/Intangible/GameServer/index.ts"

import Intangible from "../index.tsx"

export type Props = GameServerProps & BaseProps

export default function GameServer({
	game,
	playersOnline,
	serverStatus,
	_type = "GameServer",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				game,
				playersOnline,
				serverStatus,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
