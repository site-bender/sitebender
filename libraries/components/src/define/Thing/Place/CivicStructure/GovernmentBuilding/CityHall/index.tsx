import type BaseProps from "../../../../../../../types/index.ts"
import type { CityHall as CityHallProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = CityHallProps & BaseProps

export default function CityHall({
	_type = "CityHall",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
