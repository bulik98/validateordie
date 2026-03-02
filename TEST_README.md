# Test Suite for Validate or Die Landing Page

This test suite ensures the landing page functions correctly across different scenarios and prevents regressions during development.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install browser binaries for Playwright:
```bash
npm run install:browsers
```

## Running Tests

### End-to-End Tests (Recommended)
```bash
# Run all E2E tests
npm run test:e2e

# Run specific test file
npx playwright test form-validation

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests in headed mode (see browser)
npx playwright test --headed

# Generate test report
npx playwright show-report
```

### Unit Tests
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Categories

### 1. Form Validation Tests (`form-validation.test.js`)
- ✅ Empty field validation
- ✅ Email format validation
- ✅ Idea length validation
- ✅ Successful form submission
- ✅ Error handling for failed submissions

### 2. Navigation Tests (`navigation.test.js`)
- ✅ Logo click scrolls to top
- ✅ Logo hover effects
- ✅ Header navigation links
- ✅ CTA button functionality
- ✅ Mobile navigation behavior
- ✅ Order page loading

### 3. Visual Regression Tests (`visual-regression.test.js`)
- ✅ Hero section rendering (desktop/mobile)
- ✅ Pricing cards layout
- ✅ Form display on mobile
- ✅ Large screen handling
- ✅ Minimum width support
- ✅ Legal warning visibility

### 4. Integration Tests (`integrations.test.js`)
- ✅ EmailJS initialization
- ✅ Email sending with correct parameters
- ✅ Google Ads conversion tracking
- ✅ Error handling for service failures
- ✅ Form data preservation on errors
- ✅ External resource loading
- ✅ Network failure graceful handling

## Browser Support

Tests run on:
- ✅ Desktop Chrome
- ✅ Desktop Firefox
- ✅ Desktop Safari
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## Local Development

To run tests locally while developing:

1. Start local server:
```bash
python3 -m http.server 3000
```

2. Run tests in another terminal:
```bash
npm run test:e2e
```

## Continuous Integration

Tests are designed to run in CI environments. The configuration automatically:
- Uses headless browsers in CI
- Retries failed tests 2x
- Captures screenshots and videos on failures
- Generates HTML reports

## Test Coverage

The test suite covers:
- 🔒 **Security**: Form validation, XSS prevention
- 📱 **Responsiveness**: Mobile, tablet, desktop layouts
- 🔗 **Integrations**: EmailJS, Google Ads tracking
- ⚡ **Performance**: Resource loading, error handling
- 🎯 **User Experience**: Navigation, interactions, accessibility

## Adding New Tests

When adding new features, create tests in the appropriate category:

1. **Form changes** → `form-validation.test.js`
2. **UI interactions** → `navigation.test.js`
3. **Layout changes** → `visual-regression.test.js`
4. **External services** → `integrations.test.js`

## Troubleshooting

### Tests Failing Locally
1. Ensure local server is running on port 3000
2. Check browser installation: `npx playwright install`
3. Update dependencies: `npm install`

### Flaky Tests
- Tests include appropriate waits for animations
- Network requests are properly mocked
- Screenshots are captured on failures for debugging

### CI Issues
- Tests use `process.env.CI` to adjust behavior
- Retries are configured for CI environments
- Resource loading timeouts are extended for slower CI machines

---

## Quick Test Commands

```bash
# Full test suite
npm run test:e2e

# Just form tests
npx playwright test form-validation

# Mobile only
npx playwright test --project="Mobile Chrome"

# With visual output
npx playwright test --headed

# Debug mode
npx playwright test --debug
```

This test suite ensures your brutal landing page stays brutal and functional! 🔥