import type BaseProps from "../../../../../../types/index.ts"
import type { Park as ParkProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ParkProps & BaseProps

export default function Park({
	_type = "Park",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
