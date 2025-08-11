import type BaseProps from "../../../../../../types/index.ts"
import type { BookStore as BookStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = BookStoreProps & BaseProps

export default function BookStore({
	_type = "BookStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
