import type BaseProps from "../../../../../types/index.ts"
import type { InternetCafe as InternetCafeProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = InternetCafeProps & BaseProps

export default function InternetCafe({
	_type = "InternetCafe",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
