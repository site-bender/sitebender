import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type GameServerProps from "../../../../types/Thing/GameServer/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	GameServerProps,
	"GameServer",
	ExtractLevelProps<GameServerProps, IntangibleProps>
>

export default function GameServer(
	{
		game,
		playersOnline,
		serverStatus,
		schemaType = "GameServer",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				game,
				playersOnline,
				serverStatus,
				...subtypeProperties,
			}}
		/>
	)
}
