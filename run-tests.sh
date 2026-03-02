#!/bin/bash

echo "🔥 VALIDATE OR DIE - Test Suite Runner"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install

    echo -e "${YELLOW}Installing browser binaries...${NC}"
    npx playwright install
fi

# Start local server in background
echo -e "${YELLOW}Starting local server...${NC}"
python3 -m http.server 3000 &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Function to cleanup
cleanup() {
    echo -e "\n${YELLOW}Cleaning up...${NC}"
    kill $SERVER_PID 2>/dev/null
    exit
}

# Set trap to cleanup on exit
trap cleanup EXIT INT TERM

# Run tests based on argument
case "${1:-all}" in
    "form")
        echo -e "${GREEN}Running form validation tests...${NC}"
        npx playwright test form-validation
        ;;
    "nav")
        echo -e "${GREEN}Running navigation tests...${NC}"
        npx playwright test navigation
        ;;
    "visual")
        echo -e "${GREEN}Running visual regression tests...${NC}"
        npx playwright test visual-regression
        ;;
    "integration")
        echo -e "${GREEN}Running integration tests...${NC}"
        npx playwright test integrations
        ;;
    "mobile")
        echo -e "${GREEN}Running mobile tests...${NC}"
        npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
        ;;
    "desktop")
        echo -e "${GREEN}Running desktop tests...${NC}"
        npx playwright test --project="chromium" --project="firefox" --project="webkit"
        ;;
    "headed")
        echo -e "${GREEN}Running tests with browser visible...${NC}"
        npx playwright test --headed
        ;;
    "debug")
        echo -e "${GREEN}Running tests in debug mode...${NC}"
        npx playwright test --debug
        ;;
    "all"|*)
        echo -e "${GREEN}Running all tests...${NC}"
        npx playwright test
        ;;
esac

TEST_EXIT_CODE=$?

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo -e "\n${GREEN}✅ All tests passed! Your brutal landing page is bulletproof.${NC}"
else
    echo -e "\n${RED}❌ Some tests failed. Check the output above for details.${NC}"
    echo -e "${YELLOW}💡 Run 'npx playwright show-report' to see detailed test results.${NC}"
fi

exit $TEST_EXIT_CODE