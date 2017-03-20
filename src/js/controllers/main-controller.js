app.controller("mainController", ["$scope", "$timeout", function ($scope, $timeout) {
  "use strict";

  window.scope = $scope;

  $scope.util = Core.Class({
    /**
     * Returns plural suffix of unit
     *      plural(days, "%d день", "%d дня", "%d дней")
     *
     * @param {Number} num
     * @param {String} one
     * @param {String} two
     * @param {String} many
     * @returns {String}
     */
    plural: function (num, one, two, many) {
      return (function (num) {
        return (num == 1 && one)
          || (num && num < 5 && parseInt(num) == num && two) || many
      })
      (parseFloat(num) % 10 + (parseInt(num / 10) % 10 == 1 ? 1 : 0) * 10).replace(/%d/g, num);
    }
  });

  $scope.delay = parseInt(window.localStorage.enDelay) || 15;
  $scope.text = null;

  $scope.$watch("delay", () => {
    window.localStorage.enDelay = $scope.delay;
    $scope.restart($scope.delay);
  }, true);

  $scope.start = function (delay) {
    $scope.stop();
    console.log("start", $scope.text);

    $scope._to = $timeout(() => {
      $scope.text = "А как эта мысль будет по английски?";
      console.log("say", $scope.text);
      $scope.start(delay * 1000);
    }, delay * 1000, true);
  };

  $scope.stop = function () {
    $timeout.cancel($scope._to);
    $scope.text = null;
    console.log("stop", $scope.text);
  };

  $scope.restart = function (delay) {
    $scope.stop();
    $scope.start(delay);
  }

}]);
