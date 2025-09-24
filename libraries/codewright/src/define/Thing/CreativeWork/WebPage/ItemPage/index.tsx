import type BaseProps from "../../../../../../types/index.ts"
import type { ItemPage as ItemPageProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ItemPageProps & BaseProps

export default function ItemPage({
	_type = "ItemPage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
