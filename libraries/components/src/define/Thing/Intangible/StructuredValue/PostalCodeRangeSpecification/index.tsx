import type BaseProps from "../../../../../../types/index.ts"
import type { PostalCodeRangeSpecification as PostalCodeRangeSpecificationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PostalCodeRangeSpecificationProps & BaseProps

export default function PostalCodeRangeSpecification({
	_type = "PostalCodeRangeSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
