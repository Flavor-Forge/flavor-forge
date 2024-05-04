import { Selector } from 'testcafe';
import { PageIDs } from '../imports/ui/utilities/ids';

class RecipesList {
  constructor() {
    this.pageId = `#${PageIDs.recipesListPage}`;
    this.pageSelector = Selector(this.pageId);
    this.cardSelector = Selector('.card');
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least four cards on it. */
  async hasDefaultRecipes(testController) {
    const cardCount = this.cardSelector.count;
    await testController.expect(cardCount).gte(4);
  }

  /**
   * Clicks on the card at the specified index.
   * @param {TestController} testController - The TestController object.
   * @param {number} index - The index of the card to click on.
   */
  async clickCard(testController, index) {
    await testController.click(this.cardSelector.nth(index));
  }
}

export const recipesListPage = new RecipesList();
