import type BaseProps from "../../../../../../types/index.ts"
import type { Energy as EnergyProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = EnergyProps & BaseProps

export default function Energy({
	_type = "Energy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
