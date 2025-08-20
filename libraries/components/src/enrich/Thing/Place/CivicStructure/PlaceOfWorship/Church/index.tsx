import type BaseProps from "../../../../../../types/index.ts"
import type { Church as ChurchProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ChurchProps & BaseProps

export default function Church({
	_type = "Church",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
