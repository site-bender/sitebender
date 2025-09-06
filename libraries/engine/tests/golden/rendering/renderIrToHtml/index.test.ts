import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import renderIrToHtml from "../../../../src/rendering/renderIrToHtml/index.ts"
import type { Node } from "../../../../types/ir/index.ts"

describe("Golden snapshot tests", () => {
	it("renders email form with exact expected HTML structure", () => {
		const emailInput: Node = {
			v: "0.1.0",
			id: "email-input",
			kind: "element",
			tag: "input",
			attrs: {
				type: "email",
				name: "email",
				id: "email",
				required: true,
				"aria-label": "Email address",
				"aria-describedby": "email-help",
			},
			children: [],
		}

		const helpText: Node = {
			v: "0.1.0",
			id: "help-text",
			kind: "text",
			content: "Enter your email address to receive updates",
		}

		const helpElement: Node = {
			v: "0.1.0",
			id: "email-help",
			kind: "element",
			tag: "div",
			attrs: {
				id: "email-help",
				class: "help-text",
			},
			children: [helpText],
		}

		const submitButton: Node = {
			v: "0.1.0",
			id: "submit-btn",
			kind: "element",
			tag: "button",
			attrs: {
				type: "submit",
				class: "btn-primary",
			},
			children: [{
				v: "0.1.0",
				id: "btn-text",
				kind: "text",
				content: "Subscribe",
			}],
		}

		const emailForm: Node = {
			v: "0.1.0",
			id: "email-form",
			kind: "element",
			tag: "form",
			attrs: {
				method: "POST",
				action: "/subscribe",
				"aria-labelledby": "form-title",
			},
			children: [emailInput, helpElement, submitButton],
		}

		const actualHtml = renderIrToHtml(emailForm)

		// Golden snapshot: exact expected HTML structure
		const expectedHtml =
			'<form method="POST" action="/subscribe" aria-labelledby="form-title">' +
			'<input type="email" name="email" id="email" required="true" aria-label="Email address" aria-describedby="email-help" />' +
			'<div id="email-help" class="help-text">Enter your email address to receive updates</div>' +
			'<button type="submit" class="btn-primary">Subscribe</button>' +
			"</form>"

		assertEquals(actualHtml, expectedHtml)
	})

	it("renders simple conditional with exact expected HTML structure", () => {
		const errorText: Node = {
			v: "0.1.0",
			id: "error-msg",
			kind: "text",
			content: "Please correct the errors below",
		}

		const errorMessage: Node = {
			v: "0.1.0",
			id: "error-container",
			kind: "element",
			tag: "div",
			attrs: {
				class: "error-message",
				role: "alert",
				"aria-live": "polite",
			},
			children: [errorText],
		}

		const successText: Node = {
			v: "0.1.0",
			id: "success-msg",
			kind: "text",
			content: "Form submitted successfully!",
		}

		const successMessage: Node = {
			v: "0.1.0",
			id: "success-container",
			kind: "element",
			tag: "div",
			attrs: {
				class: "success-message",
				role: "status",
				"aria-live": "polite",
			},
			children: [successText],
		}

		// Test error state conditional
		const errorHtml = renderIrToHtml(errorMessage)
		const expectedErrorHtml =
			'<div class="error-message" role="alert" aria-live="polite">Please correct the errors below</div>'
		assertEquals(errorHtml, expectedErrorHtml)

		// Test success state conditional
		const successHtml = renderIrToHtml(successMessage)
		const expectedSuccessHtml =
			'<div class="success-message" role="status" aria-live="polite">Form submitted successfully!</div>'
		assertEquals(successHtml, expectedSuccessHtml)
	})

	it("renders nested conditional with complex structure", () => {
		const loadingText: Node = {
			v: "0.1.0",
			id: "loading-text",
			kind: "text",
			content: "Loading...",
		}

		const loadingSpinner: Node = {
			v: "0.1.0",
			id: "spinner",
			kind: "element",
			tag: "div",
			attrs: {
				class: "spinner",
				"aria-hidden": "true",
			},
			children: [],
		}

		const contentText: Node = {
			v: "0.1.0",
			id: "content-text",
			kind: "text",
			content: "Welcome to our site!",
		}

		const loadingState: Node = {
			v: "0.1.0",
			id: "loading-state",
			kind: "element",
			tag: "div",
			attrs: {
				class: "loading-container",
				"aria-live": "polite",
			},
			children: [loadingSpinner, loadingText],
		}

		const contentState: Node = {
			v: "0.1.0",
			id: "content-state",
			kind: "element",
			tag: "main",
			attrs: {
				class: "main-content",
				role: "main",
			},
			children: [contentText],
		}

		// Test loading conditional
		const loadingHtml = renderIrToHtml(loadingState)
		const expectedLoadingHtml =
			'<div class="loading-container" aria-live="polite">' +
			'<div class="spinner" aria-hidden="true"></div>' +
			"Loading..." +
			"</div>"
		assertEquals(loadingHtml, expectedLoadingHtml)

		// Test content conditional
		const contentHtml = renderIrToHtml(contentState)
		const expectedContentHtml =
			'<main class="main-content" role="main">Welcome to our site!</main>'
		assertEquals(contentHtml, expectedContentHtml)
	})
})
