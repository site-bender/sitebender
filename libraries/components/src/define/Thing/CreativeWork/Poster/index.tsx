import type BaseProps from "../../../../../types/index.ts"
import type { Poster as PosterProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = PosterProps & BaseProps

export default function Poster({
	_type = "Poster",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
