const { test, expect } = require('@playwright/test');

test.describe('Email and Analytics Integration Tests', () => {
  test('should load EmailJS correctly', async ({ page }) => {
    await page.goto('/');

    // Check EmailJS script is loaded
    await expect(page.locator('script[src*="emailjs"]')).toBeAttached();

    // Check EmailJS is initialized
    const emailjsInit = await page.evaluate(() => {
      return typeof window.emailjs !== 'undefined';
    });
    expect(emailjsInit).toBeTruthy();
  });

  test('should send email with correct parameters', async ({ page }) => {
    await page.goto('/#application-form');

    // Mock EmailJS send function
    let emailParams = null;
    await page.addInitScript(() => {
      window.emailjs = {
        init: () => {},
        send: (serviceId, templateId, params) => {
          window.__emailParams = { serviceId, templateId, params };
          return Promise.resolve({ status: 200, text: 'OK' });
        }
      };
    });

    // Fill and submit form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#idea', 'This is a detailed business idea for testing email integration functionality.');

    await page.click('.btn-form-submit');

    // Wait for email to be sent
    await page.waitForTimeout(2000);

    // Check email parameters
    const params = await page.evaluate(() => window.__emailParams);

    expect(params).toBeTruthy();
    expect(params.serviceId).toBe('service_qbulovn');
    expect(params.templateId).toBe('template_5uywdql');
    expect(params.params.from_name).toBe('Test User');
    expect(params.params.from_email).toBe('test@example.com');
    expect(params.params.message).toContain('This is a detailed business idea');
  });

  test('should track Google Ads conversion on order page', async ({ page }) => {
    await page.goto('/order.html');

    // Check Google Ads script is loaded
    await expect(page.locator('script[src*="googletagmanager"]')).toBeAttached();

    // Check gtag is available
    const gtagExists = await page.evaluate(() => {
      return typeof window.gtag === 'function';
    });
    expect(gtagExists).toBeTruthy();

    // Check conversion tracking is fired
    const gtagCalls = [];
    await page.addInitScript(() => {
      window.gtag = (...args) => {
        window.__gtagCalls = window.__gtagCalls || [];
        window.__gtagCalls.push(args);
      };
    });

    await page.reload();

    // Wait for analytics to load
    await page.waitForTimeout(3000);

    const calls = await page.evaluate(() => window.__gtagCalls || []);

    // Should have config and event calls
    const configCall = calls.find(call => call[0] === 'config');
    expect(configCall).toBeTruthy();
    expect(configCall[1]).toBe('AW-17981733480');

    const eventCall = calls.find(call => call[0] === 'event');
    expect(eventCall).toBeTruthy();
    expect(eventCall[1]).toBe('conversion');
  });

  test('should handle EmailJS service errors gracefully', async ({ page }) => {
    await page.goto('/#application-form');

    // Mock EmailJS to return error
    await page.addInitScript(() => {
      window.emailjs = {
        init: () => {},
        send: () => Promise.reject(new Error('Service unavailable'))
      };
    });

    // Fill form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#idea', 'This is a test idea to check error handling in email service integration.');

    await page.click('.btn-form-submit');

    // Should show error message
    await expect(page.locator('text=Failed to send')).toBeVisible({ timeout: 5000 });

    // Submit button should be re-enabled
    await expect(page.locator('.btn-form-submit')).not.toHaveText('SENDING...');
  });

  test('should preserve form data on submission error', async ({ page }) => {
    await page.goto('/#application-form');

    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      idea: 'Revolutionary app idea that will change the world and needs detailed validation.'
    };

    // Fill form
    await page.fill('#name', testData.name);
    await page.fill('#email', testData.email);
    await page.fill('#idea', testData.idea);

    // Mock EmailJS to fail
    await page.addInitScript(() => {
      window.emailjs = {
        init: () => {},
        send: () => Promise.reject(new Error('Network error'))
      };
    });

    await page.click('.btn-form-submit');

    // Wait for error
    await page.waitForTimeout(3000);

    // Form data should still be there
    await expect(page.locator('#name')).toHaveValue(testData.name);
    await expect(page.locator('#email')).toHaveValue(testData.email);
    await expect(page.locator('#idea')).toHaveValue(testData.idea);
  });

  test('should load required external resources', async ({ page }) => {
    await page.goto('/');

    // Check Google Fonts
    const fontLink = page.locator('link[href*="fonts.googleapis.com"]');
    await expect(fontLink).toBeAttached();

    // Check EmailJS
    const emailjsScript = page.locator('script[src*="emailjs"]');
    await expect(emailjsScript).toBeAttached();

    // Wait for resources to load
    await page.waitForLoadState('networkidle');

    // Check fonts are applied
    const heroTitle = page.locator('.hero-title');
    const fontFamily = await heroTitle.evaluate(el =>
      window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily).toContain('Space Grotesk');
  });

  test('should handle network failures gracefully', async ({ page }) => {
    // Block external resources
    await page.route('**/*emailjs*', route => route.abort());
    await page.route('**/*googleapis*', route => route.abort());

    await page.goto('/');

    // Page should still load and be functional
    await expect(page.locator('.hero-title')).toBeVisible();
    await expect(page.locator('#application-form')).toBeVisible();

    // Form should show error if EmailJS fails
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#idea', 'Test idea that should handle service failures gracefully.');

    await page.click('.btn-form-submit');

    // Should handle gracefully (either error message or fallback)
    await page.waitForTimeout(3000);

    // Page should not crash
    await expect(page.locator('body')).toBeVisible();
  });
});