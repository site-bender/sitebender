import type BaseProps from "../../../../../../../../types/index.ts"
import type { PrependAction as PrependActionProps } from "../../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = PrependActionProps & BaseProps

export default function PrependAction({
	_type = "PrependAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
