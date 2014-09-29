'use strict';

describe('Controller: ExhibitionsCtrl', function () {

  // load the controller's module
  beforeEach(module('milkandleadApp'));

  var ExhibitionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExhibitionsCtrl = $controller('ExhibitionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
