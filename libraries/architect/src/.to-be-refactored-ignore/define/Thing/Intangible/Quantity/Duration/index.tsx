import type BaseProps from "../../../../../../types/index.ts"
import type { Duration as DurationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DurationProps & BaseProps

export default function Duration({
	_type = "Duration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
