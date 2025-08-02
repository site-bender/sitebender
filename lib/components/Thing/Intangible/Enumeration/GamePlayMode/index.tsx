import type BaseProps from "../../../../../types/index.ts"
import type GamePlayModeProps from "../../../../../types/Thing/Intangible/Enumeration/GamePlayMode/index.ts"

import Enumeration from "../index.tsx"

export type Props = GamePlayModeProps & BaseProps

export default function GamePlayMode({
	_type = "GamePlayMode",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Enumeration>
	)
}
