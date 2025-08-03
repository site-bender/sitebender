import type BaseProps from "../../../../../types/index.ts"
import type { TravelAction as TravelActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TravelActionProps & BaseProps

export default function TravelAction({
	_type = "TravelAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
