import { test, expect } from "@playwright/test";
import { SmallLoanPage } from "../page-objects/pages/SmallLoanPage";
import { LoanDecisionPage } from "../page-objects/pages/LoanDecisionPage";

test.describe("Loan app mock tests", async () => {
  test("TL-21-1 positive test", async ({ page }) => {
    const expectedMonthlyAmount = 100005;
    const smallLoanPage = new SmallLoanPage(page);

    await page.route("**/api/loan-calc*", async (request) => {
      const responseBody = { paymentAmountMonthly: expectedMonthlyAmount };
      await request.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(responseBody),
      });
    });
    const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
    await smallLoanPage.open();
    await loanCalcResponse;
    await smallLoanPage.checkMonthlyAmount(expectedMonthlyAmount);
  });
});
