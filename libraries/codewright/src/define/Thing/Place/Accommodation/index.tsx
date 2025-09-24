import type BaseProps from "../../../../../types/index.ts"
import type { Accommodation as AccommodationProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = AccommodationProps & BaseProps

export default function Accommodation({
	_type = "Accommodation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
