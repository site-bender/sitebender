import type BaseProps from "../../../../../../../types/index.ts"
import type { EndorseAction as EndorseActionProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = EndorseActionProps & BaseProps

export default function EndorseAction({
	_type = "EndorseAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
