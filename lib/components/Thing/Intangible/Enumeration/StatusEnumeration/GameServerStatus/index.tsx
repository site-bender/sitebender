import type BaseProps from "../../../../../../types/index.ts"
import type { GameServerStatus as GameServerStatusProps } from "../../../../../../types/index.ts"

import StatusEnumeration from "../index.tsx"

export type Props = GameServerStatusProps & BaseProps

export default function GameServerStatus({
	_type = "GameServerStatus",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
