app.controller('mainController', ['$scope', function ($scope) {
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
    plural: function(num, one, two, many) {
      return (function(num) { return (num == 1 && one)
        || (num && num < 5 && parseInt(num) == num && two) || many })
      (parseFloat(num)%10 + (parseInt(num/10)%10==1?1:0) * 10).replace(/%d/g, num);
    }
  });

}]);
