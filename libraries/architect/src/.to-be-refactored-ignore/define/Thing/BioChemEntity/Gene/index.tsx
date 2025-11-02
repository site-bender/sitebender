import type BaseProps from "../../../../../types/index.ts"
import type { Gene as GeneProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = GeneProps & BaseProps

export default function Gene({
	_type = "Gene",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
