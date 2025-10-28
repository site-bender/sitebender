import type BaseProps from "../../../../../types/index.ts"
import type { HowToStep as HowToStepProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = HowToStepProps & BaseProps

export default function HowToStep({
	_type = "HowToStep",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
