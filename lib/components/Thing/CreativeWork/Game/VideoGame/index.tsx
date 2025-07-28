import type BaseProps from "../../../../../types/index.ts"
import type { VideoGameProps } from "../../../../../types/Thing/CreativeWork/Game/VideoGame/index.ts"

import Game from "../index.tsx"

export type Props = VideoGameProps & BaseProps

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
	_type = "VideoGame",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Game
			{...props}
			_type={_type}
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
