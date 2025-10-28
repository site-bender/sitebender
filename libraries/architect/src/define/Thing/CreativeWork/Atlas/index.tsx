import type BaseProps from "../../../../../types/index.ts"
import type { Atlas as AtlasProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = AtlasProps & BaseProps

export default function Atlas({
	_type = "Atlas",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
