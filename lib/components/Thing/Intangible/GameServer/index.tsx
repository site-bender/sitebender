import type BaseProps from "../../../../types/index.ts"
import type { GameServer as GameServerProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = GameServerProps & BaseProps

export default function GameServer({
	_type = "GameServer",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
