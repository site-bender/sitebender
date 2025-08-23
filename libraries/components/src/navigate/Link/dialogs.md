# Confirmation Dialogs Strategy for Navigation Components

## Overview

Confirmation dialogs prevent accidental destructive actions and data loss. This document outlines a progressive enhancement approach that starts with native browser dialogs and layers on enhanced experiences while maintaining accessibility and providing alternative UX patterns like undo.

## Core Principles

1. **Safety First**: Prevent accidental data loss or destructive actions
2. **Progressive Enhancement**: Native `confirm()` as fallback
3. **Accessibility**: Full keyboard and screen reader support
4. **Flexibility**: Support both links and forms
5. **Better UX**: Provide undo as an alternative to confirmation
6. **Non-blocking**: Avoid blocking the main thread when possible

## Native Browser Fallback

The simplest implementation uses the native `confirm()` dialog:

```html
<!-- Basic confirmation -->
<a href="/delete/123" onclick="return confirm('Are you sure?')">Delete</a>

<!-- Progressive enhancement approach -->
<a href="/delete/123" data-confirm="Are you sure you want to delete this item?">
	Delete
</a>
```

## Type Definitions

```typescript
type ConfirmConfig = {
	message?: string
	title?: string
	confirmText?: string
	cancelText?: string
	type?: "danger" | "warning" | "info"
	timeout?: number // Auto-cancel after timeout
	requireText?: string // Require typing specific text
	showOnce?: boolean // Only show once per session
	undoable?: boolean // Show undo option instead
	undoDuration?: number // How long undo is available
}

type ConfirmResult = {
	confirmed: boolean
	timestamp: number
	method: "native" | "custom" | "undo"
}

type UndoState = {
	action: string
	data: unknown
	timestamp: number
	expiresAt: number
	element: HTMLElement
}

type DialogState = {
	isOpen: boolean
	element: HTMLElement | null
	resolver: ((result: boolean) => void) | null
	config: ConfirmConfig
}
```

## Basic Enhancement Implementation

```typescript
function createConfirmEnhancer(
	element: HTMLAnchorElement | HTMLFormElement,
): () => void {
	const config = parseConfirmConfig(element.dataset.confirm)

	// Skip if already shown in this session
	if (config.showOnce && hasShownConfirmation(element)) {
		return () => {}
	}

	const handleAction = async (e: Event) => {
		// Don't confirm for same-page anchors
		if (
			element instanceof HTMLAnchorElement &&
			element.hash &&
			!element.pathname
		) {
			return
		}

		e.preventDefault()

		// Use undo pattern if configured
		if (config.undoable) {
			performUndoableAction(element, config)
			return
		}

		// Show confirmation dialog
		const result = await showConfirmation(config)

		if (result.confirmed) {
			// Record that confirmation was shown
			if (config.showOnce) {
				markConfirmationShown(element)
			}

			// Proceed with action
			proceedWithAction(element, e)
		}

		// Track confirmation result
		trackConfirmation(element, result)
	}

	// Attach to appropriate event
	const eventType = element instanceof HTMLFormElement ? "submit" : "click"
	element.addEventListener(eventType, handleAction)

	// Return cleanup function
	return () => element.removeEventListener(eventType, handleAction)
}

function parseConfirmConfig(data: string | undefined): ConfirmConfig {
	if (!data) return { message: "Are you sure?" }

	// Simple string message
	if (!data.startsWith("{")) {
		return { message: data }
	}

	// JSON configuration
	try {
		return JSON.parse(data)
	} catch {
		return { message: data }
	}
}

function proceedWithAction(
	element: HTMLAnchorElement | HTMLFormElement,
	originalEvent: Event,
): void {
	if (element instanceof HTMLAnchorElement) {
		// Navigate to link
		window.location.href = element.href
	} else {
		// Submit form
		element.submit()
	}
}
```

## Native Confirm Fallback

```typescript
function showNativeConfirmation(config: ConfirmConfig): ConfirmResult {
	const message = config.message || "Are you sure?"
	const confirmed = window.confirm(message)

	return {
		confirmed,
		timestamp: Date.now(),
		method: "native",
	}
}
```

## Custom Dialog Implementation

```typescript
function showConfirmation(config: ConfirmConfig): Promise<ConfirmResult> {
	// Use native confirm if custom dialogs not supported
	if (!supportsCustomDialogs()) {
		return Promise.resolve(showNativeConfirmation(config))
	}

	return createCustomConfirmation(config)
}

function supportsCustomDialogs(): boolean {
	return typeof HTMLDialogElement !== "undefined"
}

function createCustomConfirmation(
	config: ConfirmConfig,
): Promise<ConfirmResult> {
	return new Promise((resolve) => {
		const dialog = createConfirmDialog(config)
		const focusTrap = createFocusTrap(dialog)

		const cleanup = () => {
			focusTrap.cleanup()
			dialog.remove()
			document.body.style.overflow = ""
		}

		const handleConfirm = () => {
			cleanup()
			resolve({
				confirmed: true,
				timestamp: Date.now(),
				method: "custom",
			})
		}

		const handleCancel = () => {
			cleanup()
			resolve({
				confirmed: false,
				timestamp: Date.now(),
				method: "custom",
			})
		}

		// Set up event handlers
		const confirmBtn = dialog.querySelector(
			"[data-confirm]",
		) as HTMLButtonElement
		const cancelBtn = dialog.querySelector("[data-cancel]") as HTMLButtonElement

		confirmBtn?.addEventListener("click", handleConfirm)
		cancelBtn?.addEventListener("click", handleCancel)

		// Handle escape key
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleCancel()
			}
		}

		dialog.addEventListener("keydown", handleEscape)

		// Handle timeout
		if (config.timeout) {
			setTimeout(handleCancel, config.timeout)
		}

		// Show dialog
		document.body.appendChild(dialog)
		document.body.style.overflow = "hidden"

		if ("showModal" in dialog) {
			;(dialog as HTMLDialogElement).showModal()
		} else {
			dialog.setAttribute("open", "")
		}

		// Focus first button
		confirmBtn?.focus()
	})
}

function createConfirmDialog(config: ConfirmConfig): HTMLElement {
	const dialog = document.createElement("dialog")
	dialog.className = `confirm-dialog confirm-dialog--${
		config.type || "warning"
	}`
	dialog.setAttribute("role", "alertdialog")
	dialog.setAttribute("aria-labelledby", "confirm-title")
	dialog.setAttribute("aria-describedby", "confirm-message")

	const title = config.title || "Confirm Action"
	const message = config.message || "Are you sure?"
	const confirmText = config.confirmText || "Confirm"
	const cancelText = config.cancelText || "Cancel"

	dialog.innerHTML = `
    <div class="confirm-dialog__content">
      <h2 id="confirm-title" class="confirm-dialog__title">${
		escapeHtml(title)
	}</h2>
      <p id="confirm-message" class="confirm-dialog__message">${
		escapeHtml(message)
	}</p>
      ${
		config.requireText
			? `
        <label class="confirm-dialog__require">
          Type "${escapeHtml(config.requireText)}" to confirm:
          <input 
            type="text" 
            class="confirm-dialog__input"
            data-require="${escapeHtml(config.requireText)}"
            autocomplete="off"
          />
        </label>
      `
			: ""
	}
      <div class="confirm-dialog__actions">
        <button 
          type="button" 
          class="confirm-dialog__cancel" 
          data-cancel
        >
          ${escapeHtml(cancelText)}
        </button>
        <button 
          type="button" 
          class="confirm-dialog__confirm confirm-dialog__confirm--${
		config.type || "warning"
	}" 
          data-confirm
          ${config.requireText ? "disabled" : ""}
        >
          ${escapeHtml(confirmText)}
        </button>
      </div>
    </div>
  `

	// Handle required text input
	if (config.requireText) {
		const input = dialog.querySelector(
			".confirm-dialog__input",
		) as HTMLInputElement
		const confirmBtn = dialog.querySelector(
			"[data-confirm]",
		) as HTMLButtonElement

		input?.addEventListener("input", () => {
			const matches = input.value === config.requireText
			confirmBtn.disabled = !matches
		})
	}

	return dialog
}

function escapeHtml(text: string): string {
	const div = document.createElement("div")
	div.textContent = text
	return div.innerHTML
}
```

## Focus Management

```typescript
type FocusTrap = {
	cleanup: () => void
}

function createFocusTrap(container: HTMLElement): FocusTrap {
	const focusableSelectors = [
		"button",
		"[href]",
		"input:not([disabled])",
		"select:not([disabled])",
		"textarea:not([disabled])",
		'[tabindex]:not([tabindex="-1"])',
	]

	const focusableElements = container.querySelectorAll(
		focusableSelectors.join(","),
	)

	const firstElement = focusableElements[0] as HTMLElement
	const lastElement =
		focusableElements[focusableElements.length - 1] as HTMLElement

	const handleTab = (e: KeyboardEvent) => {
		if (e.key !== "Tab") return

		if (e.shiftKey) {
			// Shift+Tab
			if (document.activeElement === firstElement) {
				e.preventDefault()
				lastElement?.focus()
			}
		} else {
			// Tab
			if (document.activeElement === lastElement) {
				e.preventDefault()
				firstElement?.focus()
			}
		}
	}

	container.addEventListener("keydown", handleTab)

	// Store previous focus
	const previousFocus = document.activeElement as HTMLElement

	return {
		cleanup: () => {
			container.removeEventListener("keydown", handleTab)
			previousFocus?.focus()
		},
	}
}
```

## Undo Pattern Implementation

```typescript
function performUndoableAction(
	element: HTMLElement,
	config: ConfirmConfig,
): void {
	const undoDuration = config.undoDuration || 5000

	// Create undo state
	const undoState: UndoState = {
		action: element.textContent || "Action",
		data: captureActionData(element),
		timestamp: Date.now(),
		expiresAt: Date.now() + undoDuration,
		element,
	}

	// Perform the action optimistically
	const revertFn = performActionOptimistically(element)

	// Show undo notification
	const notification = showUndoNotification(undoState, revertFn)

	// Auto-commit after duration
	setTimeout(() => {
		if (notification.parentElement) {
			commitAction(undoState)
			notification.remove()
		}
	}, undoDuration)
}

function captureActionData(element: HTMLElement): unknown {
	// Capture data needed to undo the action
	if (element instanceof HTMLAnchorElement) {
		return {
			href: element.href,
			text: element.textContent,
		}
	}

	if (element instanceof HTMLFormElement) {
		return new FormData(element)
	}

	return null
}

function performActionOptimistically(element: HTMLElement): () => void {
	// Perform action and return revert function
	if (element instanceof HTMLAnchorElement) {
		// For links, we might hide the target element
		const targetId = new URL(element.href).pathname.split("/").pop()
		const target = document.getElementById(targetId || "")

		if (target) {
			const originalDisplay = target.style.display
			target.style.display = "none"
			target.setAttribute("aria-hidden", "true")

			return () => {
				target.style.display = originalDisplay
				target.removeAttribute("aria-hidden")
			}
		}
	}

	// Default: no revert needed
	return () => {}
}

function showUndoNotification(
	state: UndoState,
	revertFn: () => void,
): HTMLElement {
	const notification = document.createElement("div")
	notification.className = "undo-notification"
	notification.setAttribute("role", "alert")
	notification.setAttribute("aria-live", "polite")

	const remainingTime = Math.ceil((state.expiresAt - Date.now()) / 1000)

	notification.innerHTML = `
    <span class="undo-notification__message">
      ${escapeHtml(state.action)} will be completed in 
      <span data-countdown>${remainingTime}</span> seconds
    </span>
    <button type="button" class="undo-notification__undo" data-undo>
      Undo
    </button>
  `

	// Handle undo
	const undoBtn = notification.querySelector("[data-undo]") as HTMLButtonElement
	undoBtn?.addEventListener("click", () => {
		revertFn()
		notification.remove()
		announceUndo(state)
	})

	// Update countdown
	const countdown = notification.querySelector("[data-countdown]")
	const interval = setInterval(() => {
		const remaining = Math.ceil((state.expiresAt - Date.now()) / 1000)
		if (countdown && remaining > 0) {
			countdown.textContent = String(remaining)
		} else {
			clearInterval(interval)
		}
	}, 1000)

	// Add to page
	document.body.appendChild(notification)

	return notification
}

function commitAction(state: UndoState): void {
	// Actually perform the action
	if (state.element instanceof HTMLAnchorElement) {
		window.location.href = state.element.href
	} else if (state.element instanceof HTMLFormElement) {
		state.element.submit()
	}
}

function announceUndo(state: UndoState): void {
	const announcement = document.createElement("div")
	announcement.setAttribute("role", "status")
	announcement.setAttribute("aria-live", "polite")
	announcement.className = "sr-only"
	announcement.textContent = `${state.action} undone`

	document.body.appendChild(announcement)
	setTimeout(() => announcement.remove(), 1000)
}
```

## Session Storage for "Show Once"

```typescript
function hasShownConfirmation(element: HTMLElement): boolean {
	const key = getConfirmationKey(element)
	const shown = sessionStorage.getItem(key)
	return shown === "true"
}

function markConfirmationShown(element: HTMLElement): void {
	const key = getConfirmationKey(element)
	sessionStorage.setItem(key, "true")
}

function getConfirmationKey(element: HTMLElement): string {
	// Create unique key based on element
	if (element instanceof HTMLAnchorElement) {
		return `confirm-${element.href}`
	}

	if (element instanceof HTMLFormElement) {
		return `confirm-${element.action}-${element.method}`
	}

	return `confirm-${element.id || element.className}`
}
```

## Form Integration

```typescript
function createFormConfirmEnhancer(
	form: HTMLFormElement,
): () => void {
	const config = parseConfirmConfig(form.dataset.confirm)

	// Check if form has unsaved changes
	const trackChanges = form.dataset.confirmOnChange === "true"
	let hasChanges = false

	const handleChange = () => {
		hasChanges = true
	}

	if (trackChanges) {
		form.addEventListener("change", handleChange)
		form.addEventListener("input", handleChange)
	}

	const handleSubmit = async (e: SubmitEvent) => {
		// Skip confirmation if no changes
		if (trackChanges && !hasChanges) {
			return
		}

		// Skip for save/draft actions
		const submitter = e.submitter as HTMLButtonElement
		if (submitter?.dataset.skipConfirm === "true") {
			return
		}

		e.preventDefault()

		const result = await showConfirmation(config)

		if (result.confirmed) {
			// Remove event listener to avoid loop
			form.removeEventListener("submit", handleSubmit)
			form.submit()
		}
	}

	form.addEventListener("submit", handleSubmit)

	// Return cleanup function
	return () => {
		form.removeEventListener("submit", handleSubmit)
		if (trackChanges) {
			form.removeEventListener("change", handleChange)
			form.removeEventListener("input", handleChange)
		}
	}
}
```

## Smart Confirmations

```typescript
function createSmartConfirmation(
	element: HTMLElement,
	config: ConfirmConfig,
): ConfirmConfig {
	// Adjust based on action severity
	const severity = detectActionSeverity(element)

	const smartConfig = { ...config }

	switch (severity) {
		case "critical":
			// Require typing confirmation
			smartConfig.type = "danger"
			smartConfig.requireText = smartConfig.requireText || "DELETE"
			smartConfig.title = smartConfig.title || "Permanent Deletion"
			break

		case "high":
			// Standard confirmation
			smartConfig.type = "warning"
			smartConfig.title = smartConfig.title || "Confirm Action"
			break

		case "low":
			// Use undo pattern
			smartConfig.undoable = true
			smartConfig.undoDuration = 10000
			break
	}

	return smartConfig
}

function detectActionSeverity(
	element: HTMLElement,
): "critical" | "high" | "low" {
	const text = element.textContent?.toLowerCase() || ""
	const href = (element as HTMLAnchorElement).href || ""

	// Critical actions
	if (
		text.includes("delete") ||
		text.includes("remove") ||
		text.includes("destroy") ||
		href.includes("/delete/") ||
		href.includes("/destroy/")
	) {
		return "critical"
	}

	// High severity
	if (
		text.includes("cancel") ||
		text.includes("reject") ||
		text.includes("archive")
	) {
		return "high"
	}

	// Low severity
	return "low"
}
```

## CSS Styles

```css
/* Dialog styles */
.confirm-dialog {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-width: 90vw;
	width: 400px;
	padding: 0;
	border: none;
	border-radius: 8px;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
	background: white;
	z-index: 10000;
}

.confirm-dialog::backdrop {
	background: rgba(0, 0, 0, 0.5);
}

.confirm-dialog__content {
	padding: 24px;
}

.confirm-dialog__title {
	margin: 0 0 16px;
	font-size: 1.25rem;
	font-weight: 600;
}

.confirm-dialog__message {
	margin: 0 0 24px;
	color: #666;
}

.confirm-dialog__require {
	display: block;
	margin-bottom: 24px;
}

.confirm-dialog__input {
	display: block;
	width: 100%;
	margin-top: 8px;
	padding: 8px 12px;
	border: 1px solid #ddd;
	border-radius: 4px;
}

.confirm-dialog__actions {
	display: flex;
	gap: 12px;
	justify-content: flex-end;
}

.confirm-dialog__cancel,
.confirm-dialog__confirm {
	padding: 8px 16px;
	border: none;
	border-radius: 4px;
	font-weight: 500;
	cursor: pointer;
}

.confirm-dialog__cancel {
	background: #f5f5f5;
	color: #333;
}

.confirm-dialog__confirm {
	background: #0066cc;
	color: white;
}

.confirm-dialog__confirm--danger {
	background: #dc3545;
}

.confirm-dialog__confirm--warning {
	background: #ffc107;
	color: #333;
}

.confirm-dialog__confirm:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

/* Undo notification */
.undo-notification {
	position: fixed;
	bottom: 24px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 12px 20px;
	background: #333;
	color: white;
	border-radius: 4px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	z-index: 9999;
	animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
	from {
		transform: translateX(-50%) translateY(100%);
		opacity: 0;
	}
	to {
		transform: translateX(-50%) translateY(0);
		opacity: 1;
	}
}

.undo-notification__undo {
	padding: 4px 12px;
	background: white;
	color: #333;
	border: none;
	border-radius: 4px;
	font-weight: 500;
	cursor: pointer;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
	.confirm-dialog,
	.undo-notification {
		animation: none;
	}
}

/* High contrast mode */
@media (prefers-contrast: high) {
	.confirm-dialog {
		border: 2px solid;
	}

	.confirm-dialog__confirm {
		border: 2px solid;
	}
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
	.confirm-dialog {
		background: #1a1a1a;
		color: #e0e0e0;
	}

	.confirm-dialog__message {
		color: #aaa;
	}

	.confirm-dialog__input {
		background: #2a2a2a;
		border-color: #444;
		color: #e0e0e0;
	}

	.confirm-dialog__cancel {
		background: #2a2a2a;
		color: #e0e0e0;
	}
}
```

## Complete Integration

```typescript
function initConfirmations(): () => void {
	const cleanupFunctions: Array<() => void> = []

	// Enhance links with confirm attribute
	document.querySelectorAll("a[data-confirm]").forEach((link) => {
		const element = link as HTMLAnchorElement
		const cleanup = createConfirmEnhancer(element)
		cleanupFunctions.push(cleanup)
	})

	// Enhance forms with confirm attribute
	document.querySelectorAll("form[data-confirm]").forEach((form) => {
		const element = form as HTMLFormElement
		const cleanup = createFormConfirmEnhancer(element)
		cleanupFunctions.push(cleanup)
	})

	// Auto-detect dangerous actions
	document.querySelectorAll('a[href*="/delete/"], a[href*="/remove/"]').forEach(
		(link) => {
			const element = link as HTMLAnchorElement

			// Skip if already has confirmation
			if (element.dataset.confirm) return

			// Add smart confirmation
			element.dataset.confirm = JSON.stringify({
				title: "Confirm Deletion",
				message: "This action cannot be undone. Are you sure?",
				type: "danger",
				confirmText: "Delete",
				cancelText: "Keep",
			})

			const cleanup = createConfirmEnhancer(element)
			cleanupFunctions.push(cleanup)
		},
	)

	// Return combined cleanup function
	return () => cleanupFunctions.forEach((fn) => fn())
}
```

## Usage Examples

```tsx
// Simple confirmation
<Link to="/delete/123" confirm="Are you sure?">
  Delete
</Link>

// Detailed configuration
<Link 
  to="/delete/123"
  confirm={{
    title: "Delete Item",
    message: "This will permanently delete the item. This action cannot be undone.",
    type: "danger",
    confirmText: "Delete",
    cancelText: "Cancel",
    requireText: "DELETE"
  }}
>
  Delete Item
</Link>

// Undo pattern
<Link
  to="/archive/123"
  confirm={{
    undoable: true,
    undoDuration: 10000
  }}
>
  Archive
</Link>

// Form confirmation
<form 
  action="/api/delete" 
  method="post"
  data-confirm='{"message": "Delete all selected items?"}'
  data-confirm-on-change="true"
>
  <button type="submit">Delete Selected</button>
  <button type="submit" data-skip-confirm="true">Save Draft</button>
</form>
```

## Configuration

```typescript
type ConfirmationConfig = {
	// Default messages
	defaults: {
		title: string
		message: string
		confirmText: string
		cancelText: string
	}

	// Undo settings
	undo: {
		enabled: boolean
		duration: number
		position: "bottom" | "top"
	}

	// Smart detection
	autoDetect: {
		enabled: boolean
		patterns: RegExp[]
		severity: Record<string, "critical" | "high" | "low">
	}

	// Accessibility
	accessibility: {
		announceResults: boolean
		focusReturn: boolean
	}
}

const confirmationConfig: ConfirmationConfig = {
	defaults: {
		title: "Confirm Action",
		message: "Are you sure you want to proceed?",
		confirmText: "Confirm",
		cancelText: "Cancel",
	},
	undo: {
		enabled: true,
		duration: 5000,
		position: "bottom",
	},
	autoDetect: {
		enabled: true,
		patterns: [
			/delete|remove|destroy/i,
			/cancel|reject/i,
			/archive|deactivate/i,
		],
		severity: {
			delete: "critical",
			remove: "critical",
			cancel: "high",
			archive: "low",
		},
	},
	accessibility: {
		announceResults: true,
		focusReturn: true,
	},
}
```

## Best Practices

1. **Progressive Enhancement**: Always provide server-side confirmation for critical actions
2. **Clear Messaging**: Use specific, actionable confirmation messages
3. **Appropriate Severity**: Match confirmation type to action severity
4. **Undo Over Confirm**: Prefer undo patterns for better UX when possible
5. **Accessibility**: Full keyboard navigation and screen reader support
6. **Smart Defaults**: Auto-detect dangerous actions and add confirmations
7. **Session Awareness**: Use "show once" for repetitive actions
8. **Form Integration**: Support both links and forms consistently
9. **Immutable State**: Keep all state updates immutable
10. **Pure Functions**: Use pure functions for
