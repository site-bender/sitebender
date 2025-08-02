import type BaseProps from "../../../../types/index.ts"
import type GameProps from "../../../../types/Thing/CreativeWork/Game/index.ts"

import CreativeWork from "../index.tsx"

export type Props = GameProps & BaseProps

export default function Game({
	characterAttribute,
	gameItem,
	gameLocation,
	numberOfPlayers,
	quest,
	_type = "Game",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				characterAttribute,
				gameItem,
				gameLocation,
				numberOfPlayers,
				quest,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
