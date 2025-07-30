import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type SoftwareApplicationProps from "../../../../../types/Thing/SoftwareApplication/index.ts"
import type VideoGameProps from "../../../../../types/Thing/VideoGame/index.ts"

import SoftwareApplication from "../index.tsx"

export type Props = BaseComponentProps<
	VideoGameProps,
	"VideoGame",
	ExtractLevelProps<VideoGameProps, SoftwareApplicationProps>
>

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
		>{children}</VideoGameProps>
	)
}
