MyApp.controller('DataController', function($scope, $mdDialog, $mdToast, $animate) {
    $scope.toastPosition = {
        bottom: true,
        top: false,
        left: true,
        right: false
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function(pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };
    $scope.showSimpleToast = function() {
        $mdToast.show(
            $mdToast.simple()
            .content('Agent Deleted')
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
    };
    $scope.showConfirm = function(ev, agent) {
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Would you really like to delete this agent?')
            .content('Be Sure, this action cannot be undone!')
            .ariaLabel('Lucky day')
            .ok('Yes')
            .cancel('No')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            var index = $scope.agents.indexOf(agent);
            $scope.agents.splice(index, 1);
            $scope.showSimpleToast();
        }, function() {
            $scope.alert = 'You decided to keep your debt.';
        });
    };
});