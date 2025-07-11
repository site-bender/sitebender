document.addEventListener("DOMContentLoaded", () => {
	// Find the select element
	const selectElement = document.querySelector(".autocomplete-field select")
	if (!selectElement) return // Exit if no select element is found

	// Extract options from the select element
	const allTags = Array.from((selectElement).options).map(
		(option) => option.value,
	)

	// Create the tag input container
	const tagInputContainer = document.createElement("div")
	tagInputContainer.className = "tag-input-container"

	// Create the tags container
	const tagsContainer = document.createElement("div")
	tagsContainer.className = "tags"
	tagsContainer.setAttribute("role", "list")
	tagsContainer.id = "tags"

	// Create the input field
	const tagInput = document.createElement("input")
	tagInput.type = "text"
	tagInput.id = "tag-input"
	tagInput.setAttribute("list", "autocomplete-list")

	// Create the autocomplete list
	const autocompleteList = document.createElement("datalist")
	autocompleteList.className = "autocomplete-list"
	autocompleteList.id = "autocomplete-list"

	// Append elements to the container
	tagInputContainer.appendChild(tagsContainer)
	tagInputContainer.appendChild(tagInput)
	tagInputContainer.appendChild(autocompleteList)

	// Replace the select element with the tag input container
	selectElement.replaceWith(tagInputContainer)

	const selectedTags= []
	let focusedOptionIndex = -1

	// Function to render tags
	function renderTags() {
		tagsContainer.innerHTML = ""
		selectedTags.forEach((tag, index) => {
			const tagElement = document.createElement("div")
			tagElement.className = "tag"
			tagElement.setAttribute("role", "listitem")
			tagElement.innerHTML = `
        ${tag}
        <span class="remove" data-index="${index}" tabindex="0" role="button" aria-label="Remove ${tag}">&times;</span>
      `
			tagsContainer.appendChild(tagElement)
		})

		// Add event listeners to remove buttons
		document.querySelectorAll(".remove").forEach((button) => {
			;(button).addEventListener("click", () => {
				const index = Number(button.getAttribute("data-index"))
				selectedTags.splice(index, 1)
				renderTags()
			})
			;(button).addEventListener(
				"keydown",
				(e) => {
					if (e.key === "Enter" || e.key === " ") {
						const index = Number(button.getAttribute("data-index"))
						selectedTags.splice(index, 1)
						renderTags()
					}
				},
			)
		})
	}

	// Function to filter and sort tags
	function filterTags(filter) {
		const lowerCaseFilter = filter.toLowerCase()
		return allTags
			.filter((tag) => !selectedTags.includes(tag))
			.sort((a, b) => {
				const aStartsWith = a.toLowerCase().startsWith(lowerCaseFilter)
				const bStartsWith = b.toLowerCase().startsWith(lowerCaseFilter)
				if (aStartsWith && !bStartsWith) return -1
				if (!aStartsWith && bStartsWith) return 1
				return a.localeCompare(b)
			})
			.filter((tag) => tag.toLowerCase().includes(lowerCaseFilter))
	}

	// Function to render autocomplete list
	function renderAutocompleteList(filter = "") {
		autocompleteList.innerHTML = ""
		const filteredTags = filterTags(filter)

		if (filteredTags.length > 0) {
			autocompleteList.style.display = "block"
			tagInput.setAttribute("aria-expanded", "true")
			filteredTags.forEach((tag, index) => {
				const item = document.createElement("div")
				item.className = "autocomplete-item"
				item.setAttribute("role", "option")
				item.setAttribute("id", `option-${index}`)
				item.setAttribute("aria-selected", "false")
				item.textContent = tag
				item.addEventListener("click", () => {
					selectedTags.push(tag)
					tagInput.value = ""
					renderTags()
					renderAutocompleteList()
				})
				autocompleteList.appendChild(item)
			})
		} else {
			autocompleteList.style.display = "none"
			tagInput.setAttribute("aria-expanded", "false")
		}
		focusedOptionIndex = -1 // Reset focused option
	}

	// Function to handle keyboard navigation in the autocomplete list
	function handleAutocompleteNavigation(e) {
		const options = autocompleteList.querySelectorAll(".autocomplete-item")
		if (e.key === "ArrowDown") {
			e.preventDefault() // Prevent scrolling the page
			focusedOptionIndex = (focusedOptionIndex + 1) % options.length
		} else if (e.key === "ArrowUp") {
			e.preventDefault() // Prevent scrolling the page
			focusedOptionIndex = (focusedOptionIndex - 1 + options.length) %
				options.length
		} else if (e.key === "Enter" && focusedOptionIndex >= 0) {
			e.preventDefault() // Prevent default form submission or other behavior
			const selectedTag = options[focusedOptionIndex].textContent
			if (selectedTag) {
				selectedTags.push(selectedTag)
			}
			tagInput.value = ""
			renderTags()
			renderAutocompleteList()
			return // Exit early to avoid adding raw input
		} else {
			return // Do nothing for other keys
		}

		// Update aria-selected and focus
		options.forEach((option, index) => {
			if (index === focusedOptionIndex) {
				option.setAttribute("aria-selected", "true")
				option.classList.add("focused")
				option.scrollIntoView({ block: "nearest" }) // Ensure the item is visible
			} else {
				option.setAttribute("aria-selected", "false")
				option.classList.remove("focused")
			}
		})
	}

	// Event listener for input
	tagInput.addEventListener("input", (e) => {
		renderAutocompleteList((e.target).value)
	})

	// Event listener for keyboard navigation
	tagInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			if (focusedOptionIndex >= 0) {
				// If an item is highlighted, select it
				const options = autocompleteList.querySelectorAll(".autocomplete-item")
				const selectedTag = options[focusedOptionIndex].textContent
				if (selectedTag) {
					selectedTags.push(selectedTag)
				}
				tagInput.value = ""
				renderTags()
				renderAutocompleteList()
			} else if (tagInput.value.trim()) {
				// If no item is highlighted, add the raw input)
				if (!selectedTags.includes(newTag)) {
					selectedTags.push(newTag)
					tagInput.value = ""
					renderTags()
					renderAutocompleteList()
				}
			}
		} else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			handleAutocompleteNavigation(e)
		}
	})

	// Hide autocomplete list when clicking outside
	document.addEventListener("click", (e) => {
		if (!(e.target)?.closest(".tag-input-container")) {
			autocompleteList.style.display = "none"
			tagInput.setAttribute("aria-expanded", "false")
		}
	})
})
