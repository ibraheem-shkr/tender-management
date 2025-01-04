import { browser, element, by, ExpectedConditions as EC, logging } from 'protractor';

describe('Getting Started', () => {
  const pageElements = {
    topBarHeader: element(by.css('app-root app-top-bar h1')),
    topBarLinks: element(by.css('app-root app-top-bar a')),
    topBarCheckoutLink: element(by.cssContainingText('app-root app-top-bar a', 'Checkout')),
    tenderListHeader: element(by.css('app-root app-tender-list h2')),
    tenderListItems: element.all(by.css('app-root app-tender-list h3')),
    tenderListLinks: element.all(by.css('app-root app-tender-list a')),
    tenderDetailsPage: element(by.css('app-root app-tender-details div')),
    cartPage: element(by.css('app-root app-cart'))
  };

  describe('General', () => {
    beforeAll(async () => {
      await browser.get('/');
    });

    it('should display "My Store"', async () => {
      const title = await pageElements.topBarHeader.getText();

      expect(title).toEqual('My Store');
    });

    it('should display "tenders" on the homepage', async () => {
      const title = await pageElements.tenderListHeader.getText();

      expect(title).toEqual('tenders');
    });
  });

  describe('tender List', () => {
    beforeAll(async () => {
      await browser.get('/');
    });

    it('should display 3 items', async () => {
      const tenders = await pageElements.tenderListItems;

      expect(tenders.length).toEqual(3);
    });
  });

  describe('tender Details', () => {
    beforeEach(async () => {
      await browser.get('/');
    });

    it('should display information for a tender', async () => {
      await pageElements.tenderListLinks.get(0).click();

      const tender = pageElements.tenderDetailsPage;
      const tenderHeader = await tender.element(by.css('h3')).getText();
      const tenderPrice = await tender.element(by.css('h4')).getText();
      const tenderDescription = await tender.element(by.css('p')).getText();

      expect(await tender.isDisplayed()).toBeTruthy();
      expect(tenderHeader).toBe('Phone XL');
      expect(tenderPrice).toBe('$799.00');
      expect(tenderDescription).toBe('A large phone with one of the best screens');
    });

    it('should add the tender to the cart', async () => {
      await pageElements.tenderListLinks.get(0).click();

      const tender = pageElements.tenderDetailsPage;
      const buyButton = tender.element(by.css('button'));
      const checkoutLink = pageElements.topBarCheckoutLink;

      await buyButton.click();
      await browser.wait(EC.alertIsPresent(), 1000);
      await browser.switchTo().alert().accept();
      await checkoutLink.click();

      const cartItems = await element.all(by.css('app-root app-cart div.cart-item'));
      expect(cartItems.length).toBe(1);
    });
  });

  describe('Cart', () => {

    beforeEach(async () => {
      await browser.get('/');
    });

    it('should go through the checkout process', async () => {
      await pageElements.tenderListLinks.get(0).click();

      const checkoutLink = pageElements.topBarCheckoutLink;
      const tenderDetailsPage = pageElements.tenderDetailsPage;
      const buyButton = tenderDetailsPage.element(by.css('button'));

      const cartPage = pageElements.cartPage;
      const inputFields = cartPage.all(by.css('form input'));

      const purchaseButton = cartPage.element(by.css('button'));
      const nameField = inputFields.get(0);
      const addressField = inputFields.get(1);

      await buyButton.click();
      await browser.wait(EC.alertIsPresent(), 1000);
      await browser.switchTo().alert().accept();
      await checkoutLink.click();

      await nameField.sendKeys('Customer');
      await addressField.sendKeys('Address');
      await purchaseButton.click();

      const logs = await browser.manage().logs().get(logging.Type.BROWSER);
      const cartMessages = logs.filter(({ message }) => message.includes('Your order has been submitted'));

      expect(cartMessages.length).toBe(1);
    });
  });
});
