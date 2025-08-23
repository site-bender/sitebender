import type BaseProps from "../../../../types/index.ts"
import type { HyperTocEntry as HyperTocEntryProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = HyperTocEntryProps & BaseProps

export default function HyperTocEntry({
	_type = "HyperTocEntry",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
