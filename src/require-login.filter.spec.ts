import { RequireLoginFilter } from './require-login.filter';

describe('RedirectToLoginFilter', () => {
  it('should be defined', () => {
    expect(new RequireLoginFilter()).toBeDefined();
  });
});
