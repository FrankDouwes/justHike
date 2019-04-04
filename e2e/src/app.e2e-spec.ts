import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should base welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to just-hike!');
  });
});
