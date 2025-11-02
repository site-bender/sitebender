import type BaseProps from "../../../../../types/index.ts"
import type { LifestyleModification as LifestyleModificationProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = LifestyleModificationProps & BaseProps

export default function LifestyleModification({
	_type = "LifestyleModification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
