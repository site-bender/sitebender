import type BaseProps from "../../../../types/index.ts"
import type { Game as GameProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = GameProps & BaseProps

export default function Game({
	_type = "Game",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
