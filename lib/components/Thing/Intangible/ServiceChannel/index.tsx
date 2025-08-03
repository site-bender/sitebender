import type BaseProps from "../../../../types/index.ts"
import type { ServiceChannel as ServiceChannelProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = ServiceChannelProps & BaseProps

export default function ServiceChannel({
	_type = "ServiceChannel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
