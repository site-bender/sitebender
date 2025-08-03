import type BaseProps from "../../../../../../types/index.ts"
import type { LocationFeatureSpecification as LocationFeatureSpecificationProps } from "../../../../../../types/index.ts"

import PropertyValue from "../index.tsx"

export type Props = LocationFeatureSpecificationProps & BaseProps

export default function LocationFeatureSpecification({
	_type = "LocationFeatureSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
