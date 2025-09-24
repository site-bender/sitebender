import type BaseProps from "../../../../../../types/index.ts"
import type { CollectionPage as CollectionPageProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CollectionPageProps & BaseProps

export default function CollectionPage({
	_type = "CollectionPage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
