import type BaseProps from "../../../../types/index.ts"
import type { Trip as TripProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = TripProps & BaseProps

export default function Trip({
	_type = "Trip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
