import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getBrandText(): Promise<string> {
    return element(by.css('app-root .brand')).getText() as Promise<string>;
  }
}
