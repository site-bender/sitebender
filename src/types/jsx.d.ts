// JSX Runtime types for Deno
declare global {
	function createElement<K extends keyof HTMLElementTagNameMap>(
		tag: K,
		props?: any,
		...children: any[]
	): HTMLElementTagNameMap[K]

	function Fragment(props: { children?: any }): any

	namespace JSX {
		type Element = any
		type ElementType = any
		type ElementClass = any
		type ElementAttributesProperty = any
		type ElementChildrenAttribute = any
		type LibraryManagedAttributes<C, P> = any
		type IntrinsicAttributes = any
		type IntrinsicClassAttributes<T> = any

		interface IntrinsicElements {
			[elemName: string]: any
		}

		// HTML attributes
		interface HTMLAttributes<T = HTMLElement> {
			[key: string]: any
		}

		interface AnchorHTMLAttributes<T = HTMLAnchorElement>
			extends HTMLAttributes<T> {
			href?: string
			target?: string
			[key: string]: any
		}

		interface ButtonHTMLAttributes<T = HTMLButtonElement>
			extends HTMLAttributes<T> {
			type?: "button" | "submit" | "reset"
			disabled?: boolean
			[key: string]: any
		}

		interface FormHTMLAttributes<T = HTMLFormElement>
			extends HTMLAttributes<T> {
			action?: string
			method?: string
			[key: string]: any
		}

		interface InputHTMLAttributes<T = HTMLInputElement>
			extends HTMLAttributes<T> {
			type?: string
			name?: string
			value?: string | number
			placeholder?: string
			required?: boolean
			disabled?: boolean
			[key: string]: any
		}

		interface SelectHTMLAttributes<T = HTMLSelectElement>
			extends HTMLAttributes<T> {
			name?: string
			value?: string | number
			required?: boolean
			disabled?: boolean
			[key: string]: any
		}

		interface OptionHTMLAttributes<T = HTMLOptionElement>
			extends HTMLAttributes<T> {
			value?: string | number
			selected?: boolean
			disabled?: boolean
			[key: string]: any
		}

		interface TextareaHTMLAttributes<T = HTMLTextAreaElement>
			extends HTMLAttributes<T> {
			name?: string
			value?: string
			placeholder?: string
			rows?: number
			cols?: number
			required?: boolean
			disabled?: boolean
			[key: string]: any
		}

		interface LabelHTMLAttributes<T = HTMLLabelElement>
			extends HTMLAttributes<T> {
			htmlFor?: string
			[key: string]: any
		}

		interface FieldSetHTMLAttributes<T = HTMLFieldSetElement>
			extends HTMLAttributes<T> {
			disabled?: boolean
			[key: string]: any
		}

		interface LegendHTMLAttributes<T = HTMLLegendElement>
			extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface MetaHTMLAttributes<T = HTMLMetaElement>
			extends HTMLAttributes<T> {
			name?: string
			content?: string
			httpEquiv?: string
			[key: string]: any
		}

		interface LinkHTMLAttributes<T = HTMLLinkElement>
			extends HTMLAttributes<T> {
			rel?: string
			href?: string
			type?: string
			[key: string]: any
		}

		interface ScriptHTMLAttributes<T = HTMLScriptElement>
			extends HTMLAttributes<T> {
			src?: string
			type?: string
			[key: string]: any
		}

		interface TitleHTMLAttributes<T = HTMLTitleElement>
			extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface HtmlHTMLAttributes<T = HTMLHtmlElement>
			extends HTMLAttributes<T> {
			lang?: string
			[key: string]: any
		}

		interface BodyHTMLAttributes<T = HTMLBodyElement>
			extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface HeadHTMLAttributes<T = HTMLHeadElement>
			extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface DivHTMLAttributes<T = HTMLDivElement> extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface SpanHTMLAttributes<T = HTMLSpanElement>
			extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface ParagraphHTMLAttributes<T = HTMLParagraphElement>
			extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface HeadingHTMLAttributes<T = HTMLHeadingElement>
			extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface ListHTMLAttributes<T = HTMLUListElement | HTMLOListElement>
			extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface ListItemHTMLAttributes<T = HTMLLIElement>
			extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface MenuHTMLAttributes<T = HTMLMenuElement>
			extends HTMLAttributes<T> {
			[key: string]: any
		}

		interface DetailsHTMLAttributes<T = HTMLDetailsElement>
			extends HTMLAttributes<T> {
			open?: boolean
			[key: string]: any
		}
	}
}

export {}
