const { test, expect } = require('@playwright/test');

test.describe('Navigation and Logo Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should scroll to top when logo is clicked', async ({ page }) => {
    // Scroll down first
    await page.evaluate(() => window.scrollTo(0, 1000));

    // Wait for scroll to complete
    await page.waitForTimeout(500);

    // Click logo
    await page.click('.nav-logo');

    // Wait for smooth scroll
    await page.waitForTimeout(1000);

    // Check if we're at the top
    const scrollY = await page.evaluate(() => window.pageYOffset);
    expect(scrollY).toBe(0);
  });

  test('should show hover effects on logo', async ({ page }) => {
    const logo = page.locator('.nav-logo');

    // Hover over logo
    await logo.hover();

    // Check for hover styles (scale and brightness changes)
    const logoStyles = await logo.evaluate(el => {
      const computedStyle = window.getComputedStyle(el);
      return {
        transform: computedStyle.transform,
        filter: computedStyle.filter
      };
    });

    // Should have scale and brightness transforms
    expect(logoStyles.transform).toContain('scale');
    expect(logoStyles.filter).toContain('brightness');
  });

  test('should navigate to sections via header menu', async ({ page }) => {
    // Test METHOD link
    await page.click('text=METHOD');
    await expect(page.locator('#method')).toBeInViewport();

    // Test COST link
    await page.click('text=COST');
    await expect(page.locator('#pricing')).toBeInViewport();

    // Test PROOF link
    await page.click('text=PROOF');
    await expect(page.locator('#testimonials')).toBeInViewport();
  });

  test('should show START NOW button and navigate to form', async ({ page }) => {
    await page.click('text=START NOW');
    await expect(page.locator('#application-form')).toBeInViewport();
  });

  test('should handle mobile navigation', async ({ page, isMobile }) => {
    if (isMobile) {
      // Mobile navigation should be hidden
      await expect(page.locator('.nav-menu')).not.toBeVisible();

      // Logo should still be functional
      await page.click('.nav-logo');
      const scrollY = await page.evaluate(() => window.pageYOffset);
      expect(scrollY).toBeLessThan(100);
    }
  });

  test('should navigate all CTA buttons to application form', async ({ page }) => {
    const ctaButtons = [
      'text=VALIDATE MY IDEA NOW',
      'text=VALIDATE MY IDEA →',
      'text=START NOW'
    ];

    for (const buttonText of ctaButtons) {
      await page.goto('/');

      // Click CTA button
      await page.click(buttonText);

      // Should scroll to application form
      await expect(page.locator('#application-form')).toBeInViewport();
    }
  });

  test('should load order page correctly', async ({ page }) => {
    await page.goto('/order.html');

    // Check key elements are present
    await expect(page.locator('h1')).toContainText('REQUEST RECEIVED');
    await expect(page.locator('text=We\'ll brutally review')).toBeVisible();

    // Check analytics tracking
    await expect(page.locator('script[src*="googletagmanager"]')).toBeAttached();
  });
});