import type BaseProps from "../../../../../types/index.ts"
import type { NGO as NGOProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = NGOProps & BaseProps

export default function NGO({
	_type = "NGO",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
