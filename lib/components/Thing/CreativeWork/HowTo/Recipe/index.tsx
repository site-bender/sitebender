import type BaseProps from "../../../../../types/index.ts"
import type { Recipe as RecipeProps } from "../../../../../types/index.ts"

import HowTo from "../index.tsx"

export type Props = RecipeProps & BaseProps

export default function Recipe({
	_type = "Recipe",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
