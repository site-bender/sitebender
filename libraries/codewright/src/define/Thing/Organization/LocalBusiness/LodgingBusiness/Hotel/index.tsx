import type BaseProps from "../../../../../../../types/index.ts"
import type { Hotel as HotelProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = HotelProps & BaseProps

export default function Hotel({
	_type = "Hotel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
