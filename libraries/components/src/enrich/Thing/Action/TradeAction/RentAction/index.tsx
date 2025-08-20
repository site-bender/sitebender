import type BaseProps from "../../../../../types/index.ts"
import type { RentAction as RentActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RentActionProps & BaseProps

export default function RentAction({
	_type = "RentAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
