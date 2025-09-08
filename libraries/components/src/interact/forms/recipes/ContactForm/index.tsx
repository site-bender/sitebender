import generateShortId from "../../../../helpers/generateShortId/index.ts"
import Button from "../../../buttons/Button/index.tsx"
import ErrorMessage from "../../../feedback/ErrorMessage/index.tsx"
import EmailAddressField from "../../fields/EmailAddressField/index.tsx"
import TextField from "../../fields/TextField/index.tsx"
import Form from "../../Form/index.tsx"

export type ContactFormErrors = {
	name?: string
	email?: string
	message?: string
}

export type Props = {
	action?: string
	method?: "GET" | "POST"
	errors?: ContactFormErrors
} & Record<string, unknown>

export default function ContactForm({
	action = "/contact",
	method = "POST",
	errors = {},
	...rest
}: Props) {
	const nameId = `contact-name-${generateShortId()}`
	const emailId = `contact-email-${generateShortId()}`
	const messageId = `contact-message-${generateShortId()}`

	return (
		<Form
			method={method}
			action={action}
			includeContactFormMicrodata
			{...rest}
		>
			<TextField
				id={nameId}
				name="name"
				label="Your Name"
				required
				inputAttributes={{
					"aria-describedby": errors.name ? `${nameId}-error` : undefined,
				}}
			/>
			{errors.name
				? (
					<ErrorMessage id={`${nameId}-error`}>
						{errors.name}
					</ErrorMessage>
				)
				: null}

			<EmailAddressField
				id={emailId}
				name="emailAddress"
				label="Email Address"
				required
				inputAttributes={{
					pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
					"aria-describedby": errors.email ? `${emailId}-error` : undefined,
				}}
			/>
			{errors.email
				? (
					<ErrorMessage id={`${emailId}-error`}>
						{errors.email}
					</ErrorMessage>
				)
				: null}

			<TextField
				id={messageId}
				name="message"
				label="Message"
				isMultiline
				required
				textareaAttributes={{
					"aria-describedby": errors.message ? `${messageId}-error` : undefined,
				}}
			/>
			{errors.message
				? (
					<ErrorMessage id={`${messageId}-error`}>
						{errors.message}
					</ErrorMessage>
				)
				: null}

			<Button type="submit">Send Message</Button>
		</Form>
	)
}
