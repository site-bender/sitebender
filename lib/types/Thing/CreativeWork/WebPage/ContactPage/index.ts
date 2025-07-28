import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

import ContactPageComponent from "../../../../../../components/Thing/CreativeWork/WebPage/ContactPage/index.tsx"

export interface ContactPageProps {
}

type ContactPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& ContactPageProps

export default ContactPage
