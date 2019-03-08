import { AdminUiModule } from './admin-ui.module';

describe('AdminUiModule', () => {
  let adminUiModule: AdminUiModule;

  beforeEach(() => {
    adminUiModule = new AdminUiModule();
  });

  it('should create an instance', () => {
    expect(adminUiModule).toBeTruthy();
  });
});
