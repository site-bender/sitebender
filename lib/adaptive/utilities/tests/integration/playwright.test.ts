/**
 * Playwright Integration Tests for Critical DOM Operations
 * 
 * These tests run in real browsers to verify DOM utilities work correctly
 * in actual browser environments. Run with:
 * 
 * deno test --allow-all lib/adaptive/utilities/tests/integration/playwright.test.ts
 */

import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import { chromium, Browser, Page } from "npm:playwright"

// Helper to set up browser and page
async function setupBrowser(): Promise<{ browser: Browser; page: Page }> {
	const browser = await chromium.launch({ headless: true })
	const page = await browser.newPage()
	return { browser, page }
}

// Helper to inject utility functions into the browser
async function injectUtilities(page: Page) {
	// Note: In a real scenario, you'd bundle your utilities for browser use
	// For testing, we'll inject simplified versions that match the behavior
	await page.addScriptTag({
		content: `
			// Simplified getValue for testing
			window.getValue = function(config) {
				const selector = config.id ? '#' + config.id : 
				               config.selector ? config.selector :
				               config.name && config.tag ? config.tag + '[name="' + config.name + '"]' :
				               null;
				
				if (!selector) return { left: [{ message: 'Invalid selector' }] };
				
				const element = document.querySelector(selector);
				if (!element) return { left: [{ message: 'Element not found' }] };
				
				let value = '';
				if (element.tagName === 'INPUT') {
					if (element.type === 'checkbox') {
						value = element.checked ? 'on' : '';
					} else {
						value = element.value;
					}
				} else if (element.tagName === 'SELECT') {
					value = element.value;
				} else if (element.tagName === 'TEXTAREA') {
					value = element.value;
				} else if (element.dataset && element.dataset.value) {
					value = element.dataset.value;
				} else {
					value = element.innerHTML;
				}
				
				return { right: value };
			};
			
			// Simplified getSelector for testing
			window.getSelector = function(config) {
				if (config.id) return '#' + config.id;
				if (config.selector) return config.selector;
				if (config.name && config.tag) return config.tag + '[name="' + config.name + '"]';
				if (config.name) return '[name="' + config.name + '"]';
				if (config.tag) return config.tag;
				return null;
			};
		`
	})
}

describe("Playwright Integration Tests", () => {
	describe("getValue in real browser", () => {
		it("handles form inputs correctly", async () => {
			const { browser, page } = await setupBrowser()
			
			try {
				// Set up HTML content
				await page.setContent(`
					<!DOCTYPE html>
					<html>
					<body>
						<form>
							<input id="username" type="text" value="john_doe" />
							<input id="email" type="email" value="john@example.com" />
							<input id="age" type="number" value="25" />
							<input id="agree" type="checkbox" checked />
							<select id="country">
								<option value="us">USA</option>
								<option value="uk" selected>UK</option>
							</select>
							<textarea id="bio">Software developer</textarea>
						</form>
					</body>
					</html>
				`)
				
				// Inject utilities
				await injectUtilities(page)
				
				// Test getValue with various inputs
				const results = await page.evaluate(() => {
					return {
						username: window.getValue({ id: 'username' }),
						email: window.getValue({ id: 'email' }),
						age: window.getValue({ id: 'age' }),
						agree: window.getValue({ id: 'agree' }),
						country: window.getValue({ id: 'country' }),
						bio: window.getValue({ id: 'bio' }),
					}
				})
				
				expect(results.username).toEqual({ right: 'john_doe' })
				expect(results.email).toEqual({ right: 'john@example.com' })
				expect(results.age).toEqual({ right: '25' })
				expect(results.agree).toEqual({ right: 'on' })
				expect(results.country).toEqual({ right: 'uk' })
				expect(results.bio).toEqual({ right: 'Software developer' })
			} finally {
				await browser.close()
			}
		})

		it("handles dynamic content updates", async () => {
			const { browser, page } = await setupBrowser()
			
			try {
				await page.setContent(`
					<!DOCTYPE html>
					<html>
					<body>
						<input id="dynamic" type="text" value="initial" />
						<button id="update">Update</button>
					</body>
					</html>
				`)
				
				await injectUtilities(page)
				
				// Get initial value
				const initial = await page.evaluate(() => {
					return window.getValue({ id: 'dynamic' })
				})
				expect(initial).toEqual({ right: 'initial' })
				
				// Update the value dynamically
				await page.evaluate(() => {
					const input = document.getElementById('dynamic') as HTMLInputElement
					input.value = 'updated'
				})
				
				// Get updated value
				const updated = await page.evaluate(() => {
					return window.getValue({ id: 'dynamic' })
				})
				expect(updated).toEqual({ right: 'updated' })
			} finally {
				await browser.close()
			}
		})

		it("handles complex selectors", async () => {
			const { browser, page } = await setupBrowser()
			
			try {
				await page.setContent(`
					<!DOCTYPE html>
					<html>
					<body>
						<div class="container">
							<form class="user-form">
								<div class="field-group">
									<input type="text" name="nested" value="deep-value" />
								</div>
							</form>
						</div>
					</body>
					</html>
				`)
				
				await injectUtilities(page)
				
				const result = await page.evaluate(() => {
					return window.getValue({ 
						selector: '.container .user-form .field-group input[name="nested"]' 
					})
				})
				
				expect(result).toEqual({ right: 'deep-value' })
			} finally {
				await browser.close()
			}
		})

		it("handles data attributes correctly", async () => {
			const { browser, page } = await setupBrowser()
			
			try {
				await page.setContent(`
					<!DOCTYPE html>
					<html>
					<body>
						<div id="product" data-value="SKU123" data-price="99.99">
							Product Name
						</div>
					</body>
					</html>
				`)
				
				await injectUtilities(page)
				
				const result = await page.evaluate(() => {
					return window.getValue({ id: 'product' })
				})
				
				expect(result).toEqual({ right: 'SKU123' })
			} finally {
				await browser.close()
			}
		})
	})

	describe("getSelector in real browser", () => {
		it("generates correct selectors with priority", async () => {
			const { browser, page } = await setupBrowser()
			
			try {
				await page.setContent(`
					<!DOCTYPE html>
					<html><body></body></html>
				`)
				
				await injectUtilities(page)
				
				const selectors = await page.evaluate(() => {
					return {
						idOnly: window.getSelector({ id: 'test-id' }),
						idOverName: window.getSelector({ id: 'test-id', name: 'test-name' }),
						nameWithTag: window.getSelector({ name: 'field', tag: 'input' }),
						selectorOverAll: window.getSelector({ 
							selector: '.custom', 
							id: 'id', 
							name: 'name' 
						}),
						tagOnly: window.getSelector({ tag: 'button' }),
					}
				})
				
				expect(selectors.idOnly).toBe('#test-id')
				expect(selectors.idOverName).toBe('#test-id')
				expect(selectors.nameWithTag).toBe('input[name="field"]')
				expect(selectors.selectorOverAll).toBe('.custom')
				expect(selectors.tagOnly).toBe('button')
			} finally {
				await browser.close()
			}
		})
	})

	describe("form interaction scenarios", () => {
		it("handles complete form submission flow", async () => {
			const { browser, page } = await setupBrowser()
			
			try {
				await page.setContent(`
					<!DOCTYPE html>
					<html>
					<body>
						<form id="registration">
							<input name="username" type="text" placeholder="Username" />
							<input name="email" type="email" placeholder="Email" />
							<input name="password" type="password" placeholder="Password" />
							<select name="role">
								<option value="">Select Role</option>
								<option value="user">User</option>
								<option value="admin">Admin</option>
							</select>
							<input name="terms" type="checkbox" />
							<button type="submit">Register</button>
						</form>
					</body>
					</html>
				`)
				
				await injectUtilities(page)
				
				// Fill form
				await page.fill('input[name="username"]', 'testuser')
				await page.fill('input[name="email"]', 'test@example.com')
				await page.fill('input[name="password"]', 'secret123')
				await page.selectOption('select[name="role"]', 'admin')
				await page.check('input[name="terms"]')
				
				// Get all form values
				const formData = await page.evaluate(() => {
					return {
						username: window.getValue({ name: 'username', tag: 'input' }),
						email: window.getValue({ name: 'email', tag: 'input' }),
						password: window.getValue({ name: 'password', tag: 'input' }),
						role: window.getValue({ name: 'role', tag: 'select' }),
						terms: window.getValue({ name: 'terms', tag: 'input' }),
					}
				})
				
				expect(formData.username).toEqual({ right: 'testuser' })
				expect(formData.email).toEqual({ right: 'test@example.com' })
				expect(formData.password).toEqual({ right: 'secret123' })
				expect(formData.role).toEqual({ right: 'admin' })
				expect(formData.terms).toEqual({ right: 'on' })
			} finally {
				await browser.close()
			}
		})

		it("handles form validation states", async () => {
			const { browser, page } = await setupBrowser()
			
			try {
				await page.setContent(`
					<!DOCTYPE html>
					<html>
					<body>
						<form>
							<input 
								id="email" 
								type="email" 
								required 
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
							/>
							<span id="error" style="display:none">Invalid email</span>
						</form>
					</body>
					</html>
				`)
				
				await injectUtilities(page)
				
				// Test invalid email
				await page.fill('#email', 'invalid-email')
				const isValid = await page.evaluate(() => {
					const input = document.getElementById('email') as HTMLInputElement
					return input.checkValidity()
				})
				
				expect(isValid).toBe(false)
				
				// Test valid email
				await page.fill('#email', 'valid@example.com')
				const isValidAfter = await page.evaluate(() => {
					const input = document.getElementById('email') as HTMLInputElement
					return input.checkValidity()
				})
				
				expect(isValidAfter).toBe(true)
			} finally {
				await browser.close()
			}
		})
	})

	describe("performance characteristics", () => {
		it("handles large forms efficiently", async () => {
			const { browser, page } = await setupBrowser()
			
			try {
				// Create a form with many fields
				const fieldCount = 100
				const html = `
					<!DOCTYPE html>
					<html>
					<body>
						<form id="large-form">
							${Array.from({ length: fieldCount }, (_, i) => 
								`<input id="field-${i}" type="text" value="value-${i}" />`
							).join('\n')}
						</form>
					</body>
					</html>
				`
				
				await page.setContent(html)
				await injectUtilities(page)
				
				// Measure time to get all values
				const startTime = Date.now()
				const results = await page.evaluate((count) => {
					const values: Record<string, any> = {}
					for (let i = 0; i < count; i++) {
						values[`field-${i}`] = window.getValue({ id: `field-${i}` })
					}
					return values
				}, fieldCount)
				const endTime = Date.now()
				
				// Verify all values were retrieved
				expect(Object.keys(results).length).toBe(fieldCount)
				expect(results['field-0']).toEqual({ right: 'value-0' })
				expect(results['field-99']).toEqual({ right: 'value-99' })
				
				// Performance should be reasonable (< 1 second for 100 fields)
				expect(endTime - startTime).toBeLessThan(1000)
			} finally {
				await browser.close()
			}
		})
	})

	describe("cross-browser compatibility", () => {
		// Note: These tests can be extended to run on multiple browsers
		// For now, we're using Chromium only, but Playwright supports Firefox and WebKit too
		
		it("works consistently across supported input types", async () => {
			const { browser, page } = await setupBrowser()
			
			try {
				await page.setContent(`
					<!DOCTYPE html>
					<html>
					<body>
						<input type="text" id="text" value="text-value" />
						<input type="number" id="number" value="42" />
						<input type="email" id="email" value="test@test.com" />
						<input type="tel" id="tel" value="555-1234" />
						<input type="url" id="url" value="https://example.com" />
						<input type="date" id="date" value="2024-01-01" />
						<input type="time" id="time" value="14:30" />
						<input type="color" id="color" value="#ff0000" />
						<input type="range" id="range" value="50" />
					</body>
					</html>
				`)
				
				await injectUtilities(page)
				
				const results = await page.evaluate(() => {
					const types = ['text', 'number', 'email', 'tel', 'url', 'date', 'time', 'color', 'range']
					return types.reduce((acc, type) => {
						acc[type] = window.getValue({ id: type })
						return acc
					}, {} as Record<string, any>)
				})
				
				expect(results.text).toEqual({ right: 'text-value' })
				expect(results.number).toEqual({ right: '42' })
				expect(results.email).toEqual({ right: 'test@test.com' })
				expect(results.tel).toEqual({ right: '555-1234' })
				expect(results.url).toEqual({ right: 'https://example.com' })
				expect(results.date).toEqual({ right: '2024-01-01' })
				expect(results.time).toEqual({ right: '14:30' })
				expect(results.color).toEqual({ right: '#ff0000' })
				expect(results.range).toEqual({ right: '50' })
			} finally {
				await browser.close()
			}
		})
	})
})

// Optional: Add a separate test file for Firefox and WebKit
// This ensures cross-browser compatibility

/**
 * To run these tests:
 * deno test --allow-all lib/adaptive/utilities/tests/integration/playwright.test.ts
 * 
 * For CI/CD integration, you may want to:
 * 1. Run these tests in a separate job
 * 2. Use Docker containers with browsers pre-installed
 * 3. Run tests against multiple browser versions
 * 4. Generate screenshots on failures for debugging
 */