import type BaseProps from "../../../../../../types/index.ts"
import type { BusinessFunction as BusinessFunctionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BusinessFunctionProps & BaseProps

export default function BusinessFunction({
	_type = "BusinessFunction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
