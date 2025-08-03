import type BaseProps from "../../../../../types/index.ts"
import type { AnimalShelter as AnimalShelterProps } from "../../../../../types/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = AnimalShelterProps & BaseProps

export default function AnimalShelter({
	_type = "AnimalShelter",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
