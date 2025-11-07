import type BaseProps from "../../../../../../types/index.ts"
import type { Beach as BeachProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BeachProps & BaseProps

export default function Beach({
	_type = "Beach",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
