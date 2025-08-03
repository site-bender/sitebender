import type BaseProps from "../../../../../types/index.ts"
import type { BoatTerminal as BoatTerminalProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = BoatTerminalProps & BaseProps

export default function BoatTerminal({
	_type = "BoatTerminal",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
