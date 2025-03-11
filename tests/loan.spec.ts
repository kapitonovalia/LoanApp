import { test, expect } from '@playwright/test';
import {SmallLoanPage} from "../page-objects/pages/SmallLoanPage";

test.describe('Loan app tests', async () => {
  test ('TL-20-1 base test', async ( { page }) => {
 const smallLoanPage = new SmallLoanPage(page);
 const loanDecisionPage = new SmallLoanPage(page);
 await smallLoanPage.open();
 const prefilledAmount = await smallLoanPage.amountInput.getCurrentValue();
 const prefilledPeriod = await smallLoanPage.getFirstPeriodOption();

 await smallLoanPage.applyButton.click()
await smallLoanPage.usernameInput.fill()
    await smallLoanPage.passwordInput.fill()
    await smallLoanPage.continueButton.click()
    const finalAmount:string = await loanDecisionPage.getFinalAmountValue();

});

});
