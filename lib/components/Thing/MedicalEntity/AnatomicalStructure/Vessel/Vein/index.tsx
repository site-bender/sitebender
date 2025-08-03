import type BaseProps from "../../../../../../types/index.ts"
import type { Vein as VeinProps } from "../../../../../../types/index.ts"

import Vessel from "../index.tsx"

export type Props = VeinProps & BaseProps

export default function Vein({
	_type = "Vein",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
