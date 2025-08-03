import type BaseProps from "../../../../../types/index.ts"
import type { Mountain as MountainProps } from "../../../../../types/index.ts"

import Landform from "../index.tsx"

export type Props = MountainProps & BaseProps

export default function Mountain({
	_type = "Mountain",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
