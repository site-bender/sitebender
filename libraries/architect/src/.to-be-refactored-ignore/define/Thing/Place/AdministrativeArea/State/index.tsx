import type BaseProps from "../../../../../../types/index.ts"
import type { State as StateProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = StateProps & BaseProps

export default function State({
	_type = "State",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
