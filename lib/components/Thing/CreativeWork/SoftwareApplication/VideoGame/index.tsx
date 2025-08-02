import type BaseProps from "../../../../../types/index.ts"
import type VideoGameProps from "../../../../../types/Thing/CreativeWork/SoftwareApplication/VideoGame/index.ts"

import SoftwareApplication from "../index.tsx"

export type Props = VideoGameProps & BaseProps

export default function VideoGame(
	{
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
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<SoftwareApplication
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
		>
			{children}
		</SoftwareApplication>
	)
}
