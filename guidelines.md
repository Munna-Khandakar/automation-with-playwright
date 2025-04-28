# Playwright Test Automation Guidelines

This document provides guidelines for writing test cases using the Page Object Model (POM) structure in this Playwright automation project.

## Table of Contents
1. [Creating Page Object Model Classes](#creating-page-object-model-classes)
2. [Adding Page Objects to Fixtures](#adding-page-objects-to-fixtures)
3. [Writing Test Cases](#writing-test-cases)
4. [Selector Best Practices](#selector-best-practices)
5. [Test Naming Conventions](#test-naming-conventions)
6. [Working with HTML DOM Elements](#working-with-html-dom-elements)

## Creating Page Object Model Classes

### Basic Structure

All page objects should extend the `BasePage` class and follow this structure:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from "./BasePage";

export class NewFeaturePage extends BasePage {
    // 1. Define private locators
    private readonly someButton: Locator;
    private readonly someInput: Locator;

    // 2. Initialize locators in constructor
    constructor(page: Page) {
        super(page);
        this.someButton = this.page.getByRole('button', { name: 'Button Text' });
        this.someInput = this.page.locator('[data-test-element-id="input-field"]');
    }

    // 3. Navigation method
    async navigate(): Promise<void> {
        await this.page.goto('/path/to/feature');
        await this.waitForPageLoad();
    }

    // 4. Action methods
    async clickSomeButton(): Promise<void> {
        await this.someButton.click();
    }

    async fillSomeInput(text: string): Promise<void> {
        await this.someInput.click();
        await this.someInput.fill(text);
    }

    // 5. Assertion methods
    async assertSomeCondition(): Promise<void> {
        await expect(this.page).toHaveURL(/expected-url/);
    }
}
```

### Guidelines for Page Objects

1. **Encapsulation**: Keep locators private and expose only meaningful actions
2. **Single Responsibility**: Each page object should represent a single page or component
3. **Reusable Methods**: Create small, focused methods that can be combined for complex workflows
4. **Waiting Mechanisms**: Use the inherited waiting methods from BasePage when needed
5. **Meaningful Method Names**: Use descriptive names that explain what the method does

## Adding Page Objects to Fixtures

To make your page object available in tests, add it to the fixtures in `src/tests/fixture.ts`:

```typescript
import { Page, test as base } from '@playwright/test';
import { NewFeaturePage } from "@page/NewFeaturePage";

// 1. Add to TestFixtures type
type TestFixtures = {
    existingPage: ExistingPage;
    newFeaturePage: NewFeaturePage; // Add your new page here
}

// 2. Extend the test with your fixture
export const test = base.extend<TestFixtures>({
    // Existing fixtures...

    newFeaturePage: async ({ page }, use) => {
        const newFeaturePage = new NewFeaturePage(page);
        await use(newFeaturePage);
    },
});
```

## Writing Test Cases

Create a new spec file in `src/tests/` with a descriptive name related to the feature you're testing:

```typescript
import { test } from "./fixture";

test.describe("Feature Name", () => {
    test('should perform expected action with valid inputs', async ({ newFeaturePage }) => {
        // 1. Setup - navigate and prepare test data
        await newFeaturePage.navigate();
        const testData = 'Test Input';

        // 2. Action - perform the actions being tested
        await newFeaturePage.clickSomeButton();
        await newFeaturePage.fillSomeInput(testData);

        // 3. Assertion - verify the expected outcome
        await newFeaturePage.assertSomeCondition();
    });

    test('should handle error cases appropriately', async ({ newFeaturePage }) => {
        // Similar structure for error case testing
    });
});
```

### Test Structure Best Practices

1. **Arrange-Act-Assert**: Follow this pattern in your tests
2. **Independent Tests**: Each test should be independent and not rely on other tests
3. **Focused Tests**: Each test should verify a single piece of functionality
4. **Descriptive Test Names**: Use clear names that describe what is being tested
5. **Test Data**: Use meaningful test data that makes the test purpose clear

## Selector Best Practices

According to the [Playwright selectors documentation](https://playwright.dev/docs/api/class-selectors), here's the recommended priority for selectors:

1. **Role-based selectors** (most preferred)
   ```typescript
   page.getByRole('button', { name: 'Submit' })
   page.getByRole('textbox', { name: 'Username' })
   ```

2. **Text-based selectors**
   ```typescript
   page.getByText('Welcome to our site')
   page.getByLabel('Password')
   page.getByPlaceholder('Enter your email')
   ```

3. **Test ID selectors** (for elements without semantic roles)
   ```typescript
   page.locator('[data-test-element-id="submit-button"]')
   ```

4. **CSS/XPath selectors** (least preferred, use only when necessary)
   ```typescript
   page.locator('.submit-button')
   page.locator('//button[contains(@class, "submit")]')
   ```

### Selector Guidelines

1. **Prefer Role-Based Selectors**: They're more resilient to UI changes
2. **Use Test IDs**: Add data-test-element-id attributes to elements for stable selection
3. **Avoid Brittle Selectors**: Don't use selectors that depend on specific CSS classes or DOM structure
4. **Be Specific**: Make selectors as specific as needed to uniquely identify elements
5. **Document Complex Selectors**: Add comments explaining any complex selector logic

## Test Naming Conventions

### Test Describe Blocks

Use descriptive names for test.describe blocks that identify the feature or component being tested:

```typescript
test.describe("User Authentication", () => {
    // Authentication tests
});

test.describe("Dashboard Management", () => {
    // Dashboard tests
});
```

### Individual Test Names

Test names should follow this pattern:
- Start with "should"
- Describe the expected behavior
- Include the condition under which the behavior is expected

Examples:
- `should display error message when password is too short`
- `should successfully create dashboard with valid inputs`
- `should navigate to reports page when reports link is clicked`
- `should display confirmation dialog when delete button is clicked`

### Test Organization

1. **Group Related Tests**: Keep related tests in the same describe block
2. **Order Tests Logically**: Start with basic functionality, then edge cases
3. **Separate Test Files**: Create separate spec files for different features

## Working with HTML DOM Elements

When creating selectors from HTML DOM elements, follow these steps to choose the most effective and maintainable selectors:

### Analyzing HTML Elements

1. **Identify Semantic Elements**: Look for elements with semantic meaning (buttons, inputs, links)
2. **Check for Accessible Attributes**: Look for attributes like `aria-label`, `role`, `name`
3. **Look for Test IDs**: Check if the element has `data-test-*` attributes
4. **Examine Text Content**: Note any visible text in the element
5. **Analyze Element Hierarchy**: Understand the element's position in the DOM

### Example: Converting HTML to Selectors

Given this HTML element:

```html
<button type="submit" class="btn-primary" data-test-element-id="login-button">
  <span class="icon-login"></span>
  <span>Sign In</span>
</button>
```

Here are the selectors in order of preference:

1. **Role-based selector** (best):
   ```typescript
   page.getByRole('button', { name: 'Sign In' })
   ```

2. **Test ID selector** (good):
   ```typescript
   page.locator('[data-test-element-id="login-button"]')
   ```

3. **Text-based selector** (acceptable):
   ```typescript
   page.getByText('Sign In', { exact: true })
   ```

4. **CSS selector** (avoid if possible):
   ```typescript
   page.locator('button.btn-primary')
   ```

### Example: Form Elements

Given this form field:

```html
<div class="form-group">
  <label for="username">Username or Email</label>
  <input type="text" id="username" name="username" placeholder="Enter your username" required>
  <div class="invalid-feedback">Please enter a valid username</div>
</div>
```

Selectors in order of preference:

1. **Label-based selector** (best):
   ```typescript
   page.getByLabel('Username or Email')
   ```

2. **Role-based selector** (good):
   ```typescript
   page.getByRole('textbox', { name: 'Username or Email' })
   ```

3. **Placeholder selector** (acceptable):
   ```typescript
   page.getByPlaceholder('Enter your username')
   ```

4. **Attribute selector** (use when needed):
   ```typescript
   page.locator('input#username')
   page.locator('input[name="username"]')
   ```

### Complex Elements: Tables and Lists

For complex elements like tables, use a combination of selectors:

```html
<table data-test-element-id="users-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
```

Selectors for table elements:

```typescript
// Select the table
const table = page.locator('[data-test-element-id="users-table"]');

// Get a specific row by text content
const johnRow = page.getByRole('row', { name: 'John Doe' });

// Click the Edit button in John's row
await johnRow.getByRole('button', { name: 'Edit' }).click();

// Alternative approach using nth
const rows = page.locator('table tbody tr');
await rows.nth(0).getByRole('button', { name: 'Edit' }).click();
```

### Best Practices for Working with DOM Elements

1. **Prioritize Accessibility**: Use role-based and label-based selectors whenever possible
2. **Add Test IDs**: If you have control over the HTML, add data-test-element-id attributes
3. **Avoid Indexes**: Don't rely on nth-child or array indexes unless absolutely necessary
4. **Combine Selectors**: Use chaining to create more specific selectors
5. **Document Complex Selectors**: Add comments explaining why a complex selector was chosen
6. **Test Selector Stability**: Verify that selectors work across different states and data
