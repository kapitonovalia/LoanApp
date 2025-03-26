import {Locator, Page} from "@playwright/test";

export class LoanDecisionPage {
    readonly page: Page;
    readonly finalAmount: Locator;
    readonly finalPeriod: Locator;
    readonly loanDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finalAmount = page.getByTestId("final-page-amount");
        this.finalPeriod = page.getByTestId("final-page-period");
        this.loanDetails = page.locator('h1', {hasText: 'Loan Details'});
    }

    async getFinalAmountValue(): Promise<string> {
        const text = await this.finalAmount.innerText();

        return text.split(" ")[0];
    }

    async getFinalPeriodValue(): Promise<string> {
        const text = await this.finalPeriod.innerText();
        return text.split(" ")[0]
    }

    async getPageTitle(): Promise<string> {
        return await this.loanDetails.innerText();
    }
}