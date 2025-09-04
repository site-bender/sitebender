import createElement from "../../../helpers/createElement/index.ts"
import Fragment from "../../../helpers/Fragment/index.ts"
import Button from "../../buttons/Button/index.tsx"
import ButtonBar from "../../buttons/ButtonBar/index.tsx"
import EmailAddressField from "../fields/EmailAddressField/index.tsx"
import FieldSet from "../FieldSet/index.tsx"
import Form from "../Form/index.tsx"

export type Props = Omit<JSX.FormHTMLAttributes<HTMLFormElement>, "method"> & Record<PropertyKey, never>

export default function InOrUp(props: Props) {
	return (
		<>
			<header>
				<h1 class="sr-only">Authentication</h1>
			</header>
			<Form action="/api/auth/sign-in-or-up" class="in-or-up-form" {...props}>
				<FieldSet>
					<legend>Sign in or up</legend>
					<p>
						If you are already a member, enter your email address and use the
						{" "}
						<em>Sign In or Up</em> button to <strong>sign in</strong>.
					</p>
					<p>
						Not yet a member? Enter the email address you will use for this
						account, then use the <em>Sign In or Up</em> button to{" "}
						<strong>sign up</strong>.
					</p>
					<EmailAddressField
						help="Please provide a valid email address"
						name="emailAddress"
						required
						inputAttributes={{ size: 36 }}
					/>
				</FieldSet>
				<ButtonBar position="bottom">
					<Button name="bob" type="submit">Sign in or up</Button>
				</ButtonBar>
			</Form>
		</>
	)
}
