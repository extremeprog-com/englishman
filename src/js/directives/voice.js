app.directive('voice', function () {
  return {
    restrict: 'E',
    scope: {
      text: '='
    },
    link: function (scope, el) {
      scope.$watch("text", function (o, n) {
        FireRequest(new SpeakerUser_SayRq({text: scope.text || ''}));
      });
    }
  }
});
