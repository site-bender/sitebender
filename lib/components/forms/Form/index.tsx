import type { FormMethod } from "../../../types/components/forms/index.ts"

import createElement from "../../../utilities/createElement/index.ts"

export type Props = Omit<JSX.FormHTMLAttributes<HTMLFormElement>, "method"> & {
	classes?: Array<string>
	method?: FormMethod
}

export default function Form({
	children,
	classes = [],
	method = "POST" as FormMethod,
	...props
}: Props) {
	const clss = [...classes, "form"].join(" ")

	return (
		<form class={clss} method={method} {...props}>
			<input type="hidden" name="_charset_" value="UTF-8" />
			{children}
		</form>
	)
}
