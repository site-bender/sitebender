import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export interface ContactPageProps {
}

type ContactPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& ContactPageProps

export default ContactPage
