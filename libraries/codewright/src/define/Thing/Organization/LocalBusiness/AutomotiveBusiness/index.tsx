import type BaseProps from "../../../../../../types/index.ts"
import type { AutomotiveBusiness as AutomotiveBusinessProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = AutomotiveBusinessProps & BaseProps

export default function AutomotiveBusiness({
	_type = "AutomotiveBusiness",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
