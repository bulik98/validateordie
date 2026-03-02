const { test, expect } = require('@playwright/test');

test.describe('Form Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display form validation errors for empty fields', async ({ page }) => {
    // Navigate to form
    await page.click('text=VALIDATE MY IDEA NOW');
    await expect(page.locator('#application-form')).toBeVisible();

    // Try to submit empty form
    await page.click('.btn-form-submit');

    // Check for validation errors
    await expect(page.locator('.error')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/#application-form');

    // Fill invalid email
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'invalid-email');
    await page.fill('#idea', 'This is a detailed business idea that is longer than 20 characters');

    await page.click('.btn-form-submit');

    // Should show email validation error
    await expect(page.locator('text=Valid email required')).toBeVisible();
  });

  test('should validate idea length', async ({ page }) => {
    await page.goto('/#application-form');

    // Fill short idea
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#idea', 'Short idea');

    await page.click('.btn-form-submit');

    // Should show idea length validation error
    await expect(page.locator('text=Be more specific')).toBeVisible();
  });

  test('should successfully submit valid form', async ({ page }) => {
    await page.goto('/#application-form');

    // Fill valid form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#idea', 'This is a detailed business idea that explains the problem, solution, and target market in sufficient detail to warrant validation.');

    // Mock EmailJS response
    await page.route('https://api.emailjs.com/api/v1.0/email/send', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true })
      });
    });

    await page.click('.btn-form-submit');

    // Should redirect to order page
    await expect(page).toHaveURL(/.*order/);
  });

  test('should handle form submission errors gracefully', async ({ page }) => {
    await page.goto('/#application-form');

    // Fill valid form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#idea', 'This is a detailed business idea that explains the problem and solution clearly.');

    // Mock EmailJS error response
    await page.route('https://api.emailjs.com/api/v1.0/email/send', route => {
      route.fulfill({
        status: 400,
        body: JSON.stringify({ error: 'Bad request' })
      });
    });

    await page.click('.btn-form-submit');

    // Should show error message
    await expect(page.locator('text=Failed to send')).toBeVisible();
  });
});