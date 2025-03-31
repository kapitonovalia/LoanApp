import { test, expect } from "@playwright/test";
import { SmallLoanPage } from "../page-objects/pages/SmallLoanPage";
import { LoanDecisionPage } from "../page-objects/pages/LoanDecisionPage";

test.describe("Loan app tests", async () => {
  test("TL-20-1 base test", async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page);
    const loanDecisionPage = new LoanDecisionPage(page);
    await smallLoanPage.open();
    const prefilledAmount = await smallLoanPage.amountInput.getCurrentValue();
    const prefilledPeriod = await smallLoanPage.getFirstPeriodOption();
    await smallLoanPage.applyButton.click();
    await smallLoanPage.usernameInput.fill("test");
    await smallLoanPage.passwordInput.fill("test");
    await smallLoanPage.continueButton.click();
    const finalAmount = await loanDecisionPage.getFinalAmountValue();
    const finalPeriod = await loanDecisionPage.getFinalPeriodValue();
    console.log(prefilledAmount, prefilledPeriod, finalAmount, finalPeriod);
    expect(finalAmount).toEqual(prefilledAmount);
    expect(finalPeriod).toEqual(prefilledPeriod);
  });
  test("TL-20-2 check in view port test", async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page);
    await smallLoanPage.open();
    await smallLoanPage.applyImage2.click;
    await smallLoanPage.amountInput.checkInView();
  });

  test("TL-20-3 Change slider value using .fill()", async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page);
    const loanDecisionPage = new LoanDecisionPage(page);
    await smallLoanPage.open();
    await expect(smallLoanPage.amountSlider).toBeVisible();
    await smallLoanPage.changeSliderValue(3000);
    await expect(smallLoanPage.periodSlider).toBeVisible();
    await smallLoanPage.changePeriodSliderValue(24);
    const prefilledPeriod = await smallLoanPage.getFirstPeriodOption();
    await smallLoanPage.applyButton.click();
    await smallLoanPage.usernameInput.fill("test");
    await smallLoanPage.passwordInput.fill("test");
    await smallLoanPage.continueButton.click();
    const title = await loanDecisionPage.getPageTitle();
    expect(title).toBe("Loan Details");
  });
});
