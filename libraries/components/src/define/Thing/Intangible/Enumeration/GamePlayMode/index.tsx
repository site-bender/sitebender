import type BaseProps from "../../../../../../types/index.ts"
import type { GamePlayMode as GamePlayModeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = GamePlayModeProps & BaseProps

export default function GamePlayMode({
	_type = "GamePlayMode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
