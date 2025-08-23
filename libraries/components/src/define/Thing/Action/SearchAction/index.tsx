import type BaseProps from "../../../../types/index.ts"
import type { SearchAction as SearchActionProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SearchActionProps & BaseProps

export default function SearchAction({
	_type = "SearchAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
