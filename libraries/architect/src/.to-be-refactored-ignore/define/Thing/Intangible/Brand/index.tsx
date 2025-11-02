import type BaseProps from "../../../../../types/index.ts"
import type { Brand as BrandProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = BrandProps & BaseProps

export default function Brand({
	_type = "Brand",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
