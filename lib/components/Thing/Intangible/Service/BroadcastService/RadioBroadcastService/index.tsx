import type BaseProps from "../../../../../../types/index.ts"
import type { RadioBroadcastService as RadioBroadcastServiceProps } from "../../../../../../types/index.ts"

import BroadcastService from "../index.tsx"

export type Props = RadioBroadcastServiceProps & BaseProps

export default function RadioBroadcastService({
	_type = "RadioBroadcastService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
