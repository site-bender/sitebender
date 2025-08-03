import type BaseProps from "../../../../../../types/index.ts"
import type { GasStation as GasStationProps } from "../../../../../../types/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = GasStationProps & BaseProps

export default function GasStation({
	_type = "GasStation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
