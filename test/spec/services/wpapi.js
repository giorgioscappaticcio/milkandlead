'use strict';

describe('Service: wpapi', function () {

  // load the service's module
  beforeEach(module('milkandleadApp'));

  // instantiate service
  var wpapi;
  beforeEach(inject(function (_wpapi_) {
    wpapi = _wpapi_;
  }));

  it('should do something', function () {
    expect(!!wpapi).toBe(true);
  });

});
