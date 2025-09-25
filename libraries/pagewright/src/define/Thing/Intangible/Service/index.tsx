import type BaseProps from "../../../../../types/index.ts"
import type { Service as ServiceProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ServiceProps & BaseProps

export default function Service({
	_type = "Service",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
