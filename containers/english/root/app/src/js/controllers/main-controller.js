app.controller("mainController", ["$scope", "$timeout", function ($scope, $timeout) {
  "use strict";

  window.scope = $scope;
  var _to1, _to2;

  $scope.delay = parseInt(window.localStorage.enDelay) || 15;
  $scope.text = null;

  $scope.$watch("delay", () => {
    if ($scope.delay) {
      window.localStorage.enDelay = $scope.delay;
      $scope.restart($scope.delay);
    }
  }, true);

  $scope.start = function (delay) {
    $timeout.cancel(_to1);
    $timeout.cancel(_to2);

    _to2 = $timeout(() => {
      $scope.text = null;
      $scope.$$phase || $scope.$apply();
    }, (delay/2 * 60 * 1000), true);

    _to1 = $timeout(() => {
      $scope.text = "А как эта мысль будет по английски?";
      $scope.$$phase || $scope.$apply();
      $scope.start(delay);
    }, delay * 60 * 1000, true);
  };

  $scope.stop = function () {
    $timeout.cancel(_to1);
    $timeout.cancel(_to2);
    $scope.text = null;
  };

  $scope.restart = function (delay) {
    $scope.stop();
    $scope.start(delay);
  }

}]);
