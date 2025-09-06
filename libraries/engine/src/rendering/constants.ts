import unique from "@sitebender/toolkit/simple/array/unique/index.ts"

export const BASE_ELEMENTS = ["Body", "Head", "Html"]

export const EMBEDDED_ELEMENTS = [
	"Audio",
	"Canvas",
	"Embed",
	"Iframe",
	"Img",
	"Math",
	"Object",
	"Picture",
	"Svg",
	"Video",
]

// Should have at least one child which is palpable,
// i.e., neither empty nor hidden.
export const FLOW_ELEMENTS = [
	"A",
	"Abbr",
	"Address",
	"Article",
	"Aside",
	"Audio",
	"B",
	"Bdo",
	"Bdi",
	"BlockQuote",
	"Br",
	"Button",
	"Canvas",
	"Cite",
	"Code",
	"Data",
	"DataList",
	"Del",
	"Details",
	"Dfn",
	"Dialog",
	"Div",
	"Dl",
	"Em",
	"Embed",
	"Fieldset",
	"Figure",
	"Footer",
	"Form",
	"Fragment",
	"H1",
	"H2",
	"H3",
	"H4",
	"H5",
	"H6",
	"Hn",
	"Header",
	"Hgroup",
	"Hr",
	"I",
	"Iframe",
	"Img",
	"Input",
	"Ins",
	"Kbd",
	"Label",
	"Main",
	"Mark",
	"Math",
	"Menu",
	"Meter",
	"Nav",
	"NoScript",
	"Object",
	"Ol",
	"Output",
	"P",
	"Picture",
	"Pre",
	"Progress",
	"Q",
	"Ruby",
	"S",
	"Samp",
	"Search",
	"Script",
	"Section",
	"Select",
	"Slot",
	"Small",
	"Span",
	"Strong",
	"Sub",
	"Sup",
	"Svg",
	"Table",
	"Template",
	"TextArea",
	"TextNode",
	"Time",
	"U",
	"Ul",
	"Var",
	"Video",
	"Wbr",
] // Also, plain text

export const FLOW_IF_MAP_DESCENDANT = ["Area"]
export const FLOW_IF_ITEMPROP_ATTRIBUTE = ["Link", "Meta"]

export const FORM_ASSOCIATED_ELEMENTS = [
	"Button",
	"Fieldset",
	"Input",
	"Label",
	"Meter",
	"Object",
	"Output",
	"Progress",
	"Select",
	"TextArea",
]

export const FORM_ASSOCIATED_ELEMENTS_LABELABLE = [
	"Button",
	"Input",
	"Meter",
	"Output",
	"Progress",
	"Select",
	"TextArea",
]

export const FORM_ASSOCIATED_ELEMENTS_LISTED = [
	"Button",
	"Fieldset",
	"Input",
	"Object",
	"Output",
	"Select",
	"TextArea",
]

export const FORM_ASSOCIATED_ELEMENTS_RESETTABLE = [
	"Input",
	"Output",
	"Select",
	"TextArea",
]

export const FORM_ASSOCIATED_ELEMENTS_SUBMITTABLE = [
	"Button",
	"Input",
	"Object",
	"Select",
	"TextArea",
]

export const HEADING_ELEMENTS = [
	"H1",
	"H2",
	"H3",
	"H4",
	"H5",
	"H6",
	"Hgroup",
	"Hn",
]

export const INTERACTIVE_ELEMENTS = [
	"Button",
	"Details",
	"Embed",
	"Iframe",
	"Label",
	"Select",
	"TextArea",
]

export const INTERACTIVE_IF_HREF_ATTRIBUTE = ["A"]
export const INTERACTIVE_IF_CONTROLS_ATTRIBUTE = ["Audio", "Video"]
export const INTERACTIVE_IF_USEMAP_ATTRIBUTE = ["Img", "Object"]
export const INTERACTIVE_IF_TYPE_ATTRIBUTE_NOT_HIDDEN_STATE = ["Input"]

export const METADATA_ELEMENTS = [
	"Base",
	"Link",
	"Meta",
	"NoScript",
	"Script",
	"Style",
	"Title",
]

export const PHRASING_ELEMENTS = [
	"Abbr",
	"Audio",
	"B",
	"Bdi",
	"Bdo",
	"Br",
	"Button",
	"Canvas",
	"Cite",
	"Code",
	"Data",
	"DataList",
	"Dfn",
	"Em",
	"Embed",
	"Fragment",
	"I",
	"Iframe",
	"Img",
	"Input",
	"Kbd",
	"Label",
	"Mark",
	"Math",
	"Meter",
	"NoScript",
	"Object",
	"Output",
	"Picture",
	"Progress",
	"Q",
	"Ruby",
	"S",
	"Samp",
	"Script",
	"Select",
	"Slot",
	"Small",
	"Span",
	"Strong",
	"Sub",
	"Sup",
	"Svg",
	"Template",
	"TextArea",
	"TextNode",
	"Time",
	"U",
	"Var",
	"Video",
	"Wbr",
] // Also plain text

export const PHRASING_IF_AREA_DESCENDANT = ["Map"]
export const PHRASING_IF_ITEMPROP_ATTRIBUTE = ["Link", "Meta"]
export const PHRASING_IF_CONTAINS_PHRASING = ["A", "Del", "Ins", "Map"]

export const SCRIPT_SUPPORTING_ELEMENTS = ["Script", "Template"]

export const SECTIONING_ELEMENTS = ["Article", "Aside", "Nav", "Section"]

// TODO(#transparent-content): how to evaluate transparent content model
// MDN: If an element has a transparent content model, then its contents
// must be structured such that they would be valid HTML 5, even if the
// transparent element were removed and replaced by the child elements.

export const ALL_ELEMENTS = unique(
	BASE_ELEMENTS.concat(FLOW_ELEMENTS).concat(METADATA_ELEMENTS),
)

export const UPDATABLE_OPERATIONS = ["injectFromFormInput"]

export const ALLOW = {
	any: "*",
	none: "none",
	self: "self",
	src: "src",
}

export const ALLOWS = Object.values(ALLOW)

export const AUTOCOMPLETE = {
	additionalName: "additional-name",
	addressLevel1: "address-level1",
	addressLevel2: "address-level2",
	addressLevel3: "address-level3",
	addressLevel4: "address-level4",
	addressLine1: "address-line1",
	addressLine2: "address-line2",
	addressLine3: "address-line3",
	birthday: "bday",
	birthdayDay: "bday-day",
	birthdayMonth: "bday-month",
	birthdayYear: "bday-year",
	country: "country",
	countryName: "country-name",
	creditCardAdditionalName: "cc-additional-name",
	creditCardExpiration: "cc-exp",
	creditCardExpirationMonth: "cc-exp-month",
	creditCardExpirationYear: "cc-exp-year",
	creditCardFamilyName: "cc-family-name",
	creditCardGivenName: "cc-given-name",
	creditCardName: "cc-name",
	creditCardNumber: "cc-number",
	creditCardSecurityCode: "cc-csc",
	creditCardType: "cc-type",
	currentPassword: "current-password",
	email: "email",
	familyName: "family-name",
	givenName: "given-name",
	honorificPrefix: "honorific-prefix",
	honorificSuffix: "honorific-suffix",
	iMPP: "impp",
	language: "language",
	name: "name",
	newPassword: "new-password",
	nickname: "nickname",
	off: "off",
	on: "on",
	oneTimeCode: "one-time-code",
	organization: "organization",
	organizationTitle: "organization-title",
	photo: "photo",
	postalCode: "postal-code",
	sex: "sex",
	streetAddress: "street-address",
	telephone: "tel",
	telephoneAreaCode: "telarea-code",
	telephoneCountryCode: "tel-country-code",
	telephoneExtension: "tel-extension",
	telephoneLocal: "tel-local",
	telephoneLocalPrefix: "tel-local-prefix",
	telephoneLocalSuffix: "tel-local-suffix",
	telephoneNational: "tel-national",
	transactionAmount: "transaction-amount",
	transactionCurrency: "transaction-currency",
	uRL: "url",
	username: "username",
}

export const AUTOCOMPLETES = Object.values(AUTOCOMPLETE)

export const BLOCKING = {
	render: "render",
}

export const BLOCKINGS = Object.values(BLOCKING)

export const BUTTON_TYPE = {
	button: "button",
	reset: "reset",
	submit: "submit",
}

export const BUTTON_TYPES = Object.values(BUTTON_TYPE)

export const CROSS_ORIGIN = {
	anonymous: "anonymous",
	useCredentials: "use-credentials",
}

export const CROSS_ORIGINS = Object.values(CROSS_ORIGIN)

export const DECODING_HINT = {
	auto: "auto",
	async: "async",
	sync: "sync",
}

export const DECODING_HINTS = Object.values(DECODING_HINT)

export const DESTINATION = {
	audio: "audio",
	audioWorklet: "audioworklet",
	document: "document",
	embed: "embed",
	empty: "",
	font: "font",
	frame: "frame",
	iframe: "iframe",
	image: "image",
	json: "json",
	manifest: "manifest",
	object: "object",
	plainWorklet: "paintworklet",
	report: "report",
	script: "script",
	serviceWorker: "serviceworker",
	sharedWorker: "sharedworker",
	style: "style",
	track: "track",
	video: "video",
	webIdentity: "webidentity",
	worker: "worker",
	xslt: "xslt",
}

export const DESTINATIONS = Object.values(DESTINATION)

export const ENC_TYPE = {
	applicationXWwwFormUrlencoded: "application/x-www-form-urlencoded",
	multipartFormData: "multipart/form-data",
	textPlain: "text/plain",
}

export const ENC_TYPES = Object.values(ENC_TYPE)

export const FETCH_PRIORITY = {
	auto: "auto",
	high: "high",
	low: "low",
}

export const FETCH_PRIORITIES = Object.values(FETCH_PRIORITY)

export const FORM_METHOD = {
	get: "GET",
	post: "POST",
}

export const FORM_METHODS = Object.values(FORM_METHOD)

export const FORM_TARGET = {
	_blank: "_blank",
	_parent: "_parent",
	_self: "_self",
	_top: "_top",
	_unfencedTop: "_unfencedTop",
}

export const FORM_TARGETS = Object.values(FORM_TARGET)

export const HTTP_EQUIV = {
	contentSecurityPolicy: "content-security-policy",
	contentType: "content-type",
	defaultStyle: "default-style",
	xUaCompatible: "x-ua-compatible",
	refresh: "refresh",
}

export const HTTP_EQUIVS = Object.values(HTTP_EQUIV)

export const LOADING = {
	eager: "eager",
	lazy: "lazy",
}

export const LOADINGS = Object.values(LOADING)

export const ORDERED_LIST = {
	numeralDecimal: "1",
	numeralRomanLowercase: "i",
	numeralRomanUppercase: "I",
	alphabeticLowercase: "a",
	alphabeticUppercase: "A",
}

export const ORDERED_LISTS = Object.values(ORDERED_LIST)

export const POPOVER_TARGET_ACTION = {
	hide: "hide",
	show: "show",
	toggle: "toggle",
}

export const POPOVER_TARGET_ACTIONS = Object.values(POPOVER_TARGET_ACTION)

export const PRELOAD = {
	auto: "auto",
	empty: "",
	metadata: "metadata",
	none: "none",
}

export const PRELOADS = Object.values(PRELOAD)

export const REFERRER_POLICY = {
	empty: "",
	noReferrerWhenDowngrade: "no-referrer-when-downgrade",
	noReferrer: "no-referrer",
	originWhenCrossOrigin: "origin-when-cross-origin",
	origin: "origin",
	sameOrigin: "same-origin",
	strictOriginWhenCrossOrigin: "strict-origin-when-cross-origin",
	strictOrigin: "strict-origin",
	unsafeUrl: "unsafe-url",
}

export const REFERRER_POLICIES = Object.values(REFERRER_POLICY)

export const REL_FOR_AREA_AND_A = {
	alternate: "alternate",
	author: "author",
	bookmark: "bookmark",
	external: "external",
	help: "help",
	license: "license",
	noFollow: "nofollow",
	noOpener: "noopener",
	noReferrer: "noreferrer",
	opener: "opener",
	privacyPolicy: "privacy-policy",
	search: "search",
	tag: "tag",
	termsOfService: "terms-of-service",
}

export const RELS_FOR_AREA = Object.values(REL_FOR_AREA_AND_A)

export const REL_FOR_FORM = {
	alternate: "alternate",
	author: "author",
	bookmark: "bookmark",
	canonical: "canonical",
	dnsPrefetch: "dns-prefetch",
	expect: "expect",
	external: "external",
	help: "help",
	icon: "icon",
	license: "license",
	manifest: "manifest",
	modulePreload: "modulepreload",
	noFollow: "nofollow",
	noOpener: "noopener",
	noReferrer: "noreferrer",
	opener: "opener",
	pingback: "pingback",
	preconnect: "preconnect",
	prefetch: "prefetch",
	preload: "preload",
	privacyPolicy: "privacy-policy",
	search: "search",
	stylesheet: "stylesheet",
	tag: "tag",
	termsOfService: "terms-of-service",
}

export const RELS_FOR_FORM = Object.values(REL_FOR_FORM)

export const REL_FOR_LINK = {
	alternate: "alternate",
	author: "author",
	canonical: "canonical",
	dnsPrefetch: "dns-prefetch",
	expect: "expect",
	help: "help",
	icon: "icon",
	license: "license",
	manifest: "manifest",
	modulePreload: "modulepreload",
	pingback: "pingback",
	preconnect: "preconnect",
	prefetch: "prefetch",
	preload: "preload",
	privacyPolicy: "privacy-policy",
	search: "search",
	stylesheet: "stylesheet",
	termsOfService: "terms-of-service",
}

export const RELS_FOR_LINK = Object.values(REL_FOR_LINK)

export const SANDBOX = {
	allowDownloads: "allow-downloads",
	allowForms: "allow-forms",
	allowModals: "allow-modals",
	allowOrientationLock: "allow-orientation-lock",
	allowPointerLock: "allow-pointer-lock",
	allowPopups: "allow-popups",
	allowPopupsToEscapeSandbox: "allow-popups-to-escape-sandbox",
	allowPresentation: "allow-presentation",
	allowSameOrigin: "allow-same-origin",
	allowScripts: "allow-scripts",
	allowTopNavigation: "allow-top-navigation",
	allowTopNavigationByUserActivation:
		"allow-top-navigation-by-user-activation",
	allowTopNavigationToCustomProtocols:
		"allow-top-navigation-to-custom-protocols",
}

export const SANDBOXES = Object.values(SANDBOX)

export const SCOPE = {
	row: "row",
	col: "col",
	rowGroup: "rowgroup",
	colGroup: "colgroup",
	auto: "auto",
}

export const SCOPES = Object.values(SCOPE)

export const SHADOW_ROOT_MODE = {
	closed: "closed",
	open: "open",
}

export const SHADOW_ROOT_MODES = Object.values(SHADOW_ROOT_MODE)

export const SHAPE = {
	circle: "circle",
	circ: "circ",
	default: "default",
	poly: "poly",
	polygon: "polygon",
	rect: "rect",
	rectangle: "rectangle",
}

export const SHAPES = Object.values(SHAPE)

export const TARGET = {
	_blank: "_blank",
	_parent: "_parent",
	_self: "_self",
	_top: "_top",
}

export const TARGETS = Object.values(TARGET)

export const WRAP = {
	hard: "hard",
	soft: "soft",
}

export const WRAPS = Object.values(WRAP)
