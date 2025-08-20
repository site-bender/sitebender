import type BaseProps from "../../../../../types/index.ts"
import type { CoverArt as CoverArtProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CoverArtProps & BaseProps

export default function CoverArt({
	_type = "CoverArt",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
