import type BaseProps from "../../../../../../types/index.ts"
import type { TheaterGroup as TheaterGroupProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TheaterGroupProps & BaseProps

export default function TheaterGroup({
	_type = "TheaterGroup",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
