import type BaseProps from "../../../../../../types/index.ts"
import type { Zoo as ZooProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ZooProps & BaseProps

export default function Zoo({
	_type = "Zoo",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
