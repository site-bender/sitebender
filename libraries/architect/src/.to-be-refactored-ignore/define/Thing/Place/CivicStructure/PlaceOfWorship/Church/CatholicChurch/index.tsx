import type BaseProps from "../../../../../../../../types/index.ts"
import type { CatholicChurch as CatholicChurchProps } from "../../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = CatholicChurchProps & BaseProps

export default function CatholicChurch({
	_type = "CatholicChurch",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
