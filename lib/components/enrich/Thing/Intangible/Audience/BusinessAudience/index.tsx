import type BaseProps from "../../../../../types/index.ts"
import type { BusinessAudience as BusinessAudienceProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BusinessAudienceProps & BaseProps

export default function BusinessAudience({
	_type = "BusinessAudience",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
