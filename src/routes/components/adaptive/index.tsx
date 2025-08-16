// Import SSR renderer
import ssrRenderAdaptive from "~lib/adaptive/rendering/ssrRenderAdaptive/index.tsx"
/**
 * Adaptive Components Demo Page
 *
 * Demonstrates the reactive calculation, validation, and conditional display
 * capabilities of the adaptive component system.
 */

// Import the adaptive components we created
import {
	Add,
	Amount,
	And,
	By,
	Constant,
	Divide,
	ExpectedValue,
	From,
	FromElement,
	FromLocalStorage,
	IsEqualTo,
	IsLessThan,
	IsMoreThan,
	// Pattern matching
	Matches,
	Multiply,
	Or,
	Pattern,
	Subtract,
	Threshold,
	// Wrappers
	Value,
} from "~lib/components/adaptive/index.ts"

export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Adaptive Components - Reactive Calculations & Validations</title>
			<meta
				name="description"
				content="Demonstrates reactive calculations, validations, and conditional display using the adaptive component system."
			/>
		</>
	)
}

export default function AdaptiveDemo({ route }: Props = {}) {
	// Example 1: Calculator using Add component
	const calculatorConfig = (
		<Add type="Number">
			<FromElement id="price" type="Number" />
			<FromElement id="tax" type="Number" />
			<FromElement id="shipping" type="Number" />
		</Add>
	)

	// Example 2: Age validation using And + comparators
	const ageValidation = (
		<And>
			<IsMoreThan>
				<Value>
					<FromElement id="age" type="Number" />
				</Value>
				<Threshold>
					<Constant value={17} />
				</Threshold>
			</IsMoreThan>
			<IsLessThan>
				<Value>
					<FromElement id="age" type="Number" />
				</Value>
				<Threshold>
					<Constant value={121} />
				</Threshold>
			</IsLessThan>
		</And>
	)

	// Example 3: Email validation using Matches
	const emailValidation = (
		<Matches>
			<Value>
				<FromElement id="email" type="String" />
			</Value>
			<Pattern>{"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}</Pattern>
		</Matches>
	)

	return (
		<main>
			<h1>Adaptive Components Demo</h1>
			<p class="lead">
				Using actual adaptive components for reactive calculations and
				validations.
			</p>

			<section class="example">
				<h2>1. Calculator with Add Component</h2>
				<p>
					This uses the Add component to sum values from three input elements.
				</p>

				<div class="demo-box">
					<label>
						Price: <input id="price" type="number" value="100" />
					</label>
					<label>
						Tax: <input id="tax" type="number" value="10" />
					</label>
					<label>
						Shipping: <input id="shipping" type="number" value="5" />
					</label>

					<div class="result">
						Total: $<span id="calculator-result">
							{ssrRenderAdaptive(calculatorConfig)}
						</span>
					</div>
				</div>

				<details>
					<summary>Configuration Object</summary>
					<pre><code>{JSON.stringify(calculatorConfig, null, 2)}</code></pre>
				</details>
			</section>

			<section class="example">
				<h2>2. Validation with Comparators</h2>
				<p>
					Using And, IsMoreThan, IsLessThan for age validation and Matches for
					email.
				</p>

				<div class="demo-box">
					<label>
						Age: <input id="age" type="number" value="25" min="18" max="120" />
					</label>
					<div class="result">
						Age Valid (18-120): {ssrRenderAdaptive(ageValidation)}
					</div>

					<label>
						Email: <input id="email" type="email" value="user@example.com" />
					</label>
					<div class="result">
						Email Valid: {ssrRenderAdaptive(emailValidation)}
					</div>
				</div>

				<details>
					<summary>Age Validation Config</summary>
					<pre><code>{JSON.stringify(ageValidation, null, 2)}</code></pre>
				</details>

				<details>
					<summary>Email Validation Config</summary>
					<pre><code>{JSON.stringify(emailValidation, null, 2)}</code></pre>
				</details>
			</section>

			<section class="example">
				<h2>3. Discount Calculator with Subtract</h2>
				<p>Using Subtract with semantic wrappers From and Amount.</p>

				<div class="demo-box">
					<label>
						Original Price:{" "}
						<input id="original-price" type="number" value="200" />
					</label>
					<label>
						Discount: <input id="discount" type="number" value="50" />
					</label>
					<div class="result">
						Final Price: $<span>
							{ssrRenderAdaptive(
								(
									<Subtract>
										<From>
											<FromElement id="original-price" type="Number" />
										</From>
										<Amount>
											<FromElement id="discount" type="Number" />
										</Amount>
									</Subtract>
								),
							)}
						</span>
					</div>
				</div>
			</section>

			<section class="example">
				<h2>4. Conditional Display with IsEqualTo</h2>
				<p>Using IsEqualTo to check subscription type.</p>

				<div class="demo-box">
					<label>
						Subscription:
						<select id="subscription">
							<option value="free">Free</option>
							<option value="basic">Basic</option>
							<option value="premium">Premium</option>
						</select>
					</label>
					<div class="result">
						Is Premium: {ssrRenderAdaptive(
							(
								<IsEqualTo>
									<Value>
										<FromElement id="subscription" type="String" />
									</Value>
									<ExpectedValue>
										<Constant value="premium" />
									</ExpectedValue>
								</IsEqualTo>
							),
						)}
					</div>
				</div>
			</section>

			<section class="info">
				<h2>Component Configuration Output</h2>
				<p>
					The adaptive components create configuration objects that describe
					reactive behavior. These configurations would be processed by the
					adaptive rendering system to create live reactive DOM updates.
				</p>
				<p>
					<strong>Note:</strong>{" "}
					The rendering system is still being developed. Currently, the
					components generate the configuration structure that will drive the
					reactive updates.
				</p>
			</section>
		</main>
	)
}
