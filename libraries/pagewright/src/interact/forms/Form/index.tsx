import type { FormMethod } from "../../../../types/pagewright/forms/index.ts"

import generateShortId from "../../../helpers/generateShortId/index.ts"

export type Props = Record<string, unknown> & {
	classes?: Array<string>
	method?: FormMethod
	clientValidation?: boolean
	label?: string
	includeContactFormMicrodata?: boolean
}

export default function Form({
	children,
	classes = [],
	method = "POST" as FormMethod,
	clientValidation = true,
	label,
	includeContactFormMicrodata = false,
	...props
}: Props) {
	const clss = [...classes, "form"].join(" ")
	const id = (props as { id?: string }).id || `form-${generateShortId()}`

	const micro = includeContactFormMicrodata
		? { itemscope: true, itemtype: "https://schema.org/ContactForm" }
		: {}

	return (
		<form
			class={clss}
			id={id}
			method={method}
			aria-label={label}
			{...(clientValidation ? {} : { novalidate: true })}
			{...micro}
			{...props}
		>
			<input type="hidden" name="_charset_" value="UTF-8" />
			{children}
		</form>
	)
}
