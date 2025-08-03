import type BaseProps from "../../../../types/index.ts"
import type { Ticket as TicketProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = TicketProps & BaseProps

export default function Ticket({
	_type = "Ticket",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
