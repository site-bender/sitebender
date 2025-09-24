import type BaseProps from "../../../../../types/index.ts"
import type { VisualArtwork as VisualArtworkProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = VisualArtworkProps & BaseProps

export default function VisualArtwork({
	_type = "VisualArtwork",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
