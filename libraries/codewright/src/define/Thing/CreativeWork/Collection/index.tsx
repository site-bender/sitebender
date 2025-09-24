import type BaseProps from "../../../../../types/index.ts"
import type { Collection as CollectionProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = CollectionProps & BaseProps

export default function Collection({
	_type = "Collection",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
