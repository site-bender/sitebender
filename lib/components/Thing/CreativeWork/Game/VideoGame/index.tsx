import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { GameProps } from "../../../../../types/Thing/CreativeWork/Game/index.ts"
import type { VideoGameProps } from "../../../../../types/Thing/CreativeWork/Game/VideoGame/index.ts"

import Game from "../index.tsx"

export type Props = BaseComponentProps<
	VideoGameProps,
	"VideoGame",
	ExtractLevelProps<ThingProps, CreativeWorkProps, GameProps>
>

export default function VideoGame({
	actor,
	actors,
	cheatCode,
	director,
	directors,
	gameEdition,
	gamePlatform,
	gameServer,
	gameTip,
	musicBy,
	playMode,
	trailer,
	schemaType = "VideoGame",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Game
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				actor,
				actors,
				cheatCode,
				director,
				directors,
				gameEdition,
				gamePlatform,
				gameServer,
				gameTip,
				musicBy,
				playMode,
				trailer,
				...subtypeProperties,
			}}
		/>
	)
}
