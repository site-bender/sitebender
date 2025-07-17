import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type GameProps from "../../../../types/Thing/Game/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	GameProps,
	"Game",
	ExtractLevelProps<GameProps, CreativeWorkProps>
>

export default function Game(
	{
		characterAttribute,
		gameItem,
		gameLocation,
		numberOfPlayers,
		quest,
		schemaType = "Game",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				characterAttribute,
				gameItem,
				gameLocation,
				numberOfPlayers,
				quest,
				...subtypeProperties,
			}}
		/>
	)
}
