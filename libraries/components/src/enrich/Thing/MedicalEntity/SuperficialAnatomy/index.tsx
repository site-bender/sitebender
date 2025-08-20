import type BaseProps from "../../../../types/index.ts"
import type { SuperficialAnatomy as SuperficialAnatomyProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SuperficialAnatomyProps & BaseProps

export default function SuperficialAnatomy({
	_type = "SuperficialAnatomy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
