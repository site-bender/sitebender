import type BaseProps from "../../../../../types/index.ts"
import type { Residence as ResidenceProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ResidenceProps & BaseProps

export default function Residence({
	_type = "Residence",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
