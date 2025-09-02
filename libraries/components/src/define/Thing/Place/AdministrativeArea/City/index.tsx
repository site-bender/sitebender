import type BaseProps from "../../../../../../types/index.ts"
import type { City as CityProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CityProps & BaseProps

export default function City({
	_type = "City",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
