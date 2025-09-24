import type BaseProps from "../../../../../types/index.ts"
import type { Hackathon as HackathonProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = HackathonProps & BaseProps

export default function Hackathon({
	_type = "Hackathon",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
