import type BaseProps from "../../../../../types/index.ts"
import type { RsvpResponseType as RsvpResponseTypeProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RsvpResponseTypeProps & BaseProps

export default function RsvpResponseType({
	_type = "RsvpResponseType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
