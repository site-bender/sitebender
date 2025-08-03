import type BaseProps from "../../../../../types/index.ts"
import type { DefinedRegion as DefinedRegionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DefinedRegionProps & BaseProps

export default function DefinedRegion({
	_type = "DefinedRegion",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
