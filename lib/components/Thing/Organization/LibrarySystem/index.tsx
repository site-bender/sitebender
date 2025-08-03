import type BaseProps from "../../../../types/index.ts"
import type { LibrarySystem as LibrarySystemProps } from "../../../../types/index.ts"

import Organization from "../index.tsx"

export type Props = LibrarySystemProps & BaseProps

export default function LibrarySystem({
	_type = "LibrarySystem",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
