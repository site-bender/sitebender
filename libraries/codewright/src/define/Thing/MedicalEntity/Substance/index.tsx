import type BaseProps from "../../../../../types/index.ts"
import type { Substance as SubstanceProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SubstanceProps & BaseProps

export default function Substance({
	_type = "Substance",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
