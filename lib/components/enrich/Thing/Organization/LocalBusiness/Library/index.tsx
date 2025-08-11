import type BaseProps from "../../../../../types/index.ts"
import type { Library as LibraryProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = LibraryProps & BaseProps

export default function Library({
	_type = "Library",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
