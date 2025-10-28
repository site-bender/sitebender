import type BaseProps from "../../../../../../types/index.ts"
import type { SubwayStation as SubwayStationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SubwayStationProps & BaseProps

export default function SubwayStation({
	_type = "SubwayStation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
