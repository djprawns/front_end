MyApp.controller('InfoController', function($scope, $mdDialog, $mdToast, $animate, $routeParams, SharedDataService, $location) {
    $scope.agentId = $routeParams.agentId;
    var b = SharedDataService.getAgents();

    b[0].forEach(function(entry){
        // console.log(entry);
        if(entry.agent_id == $routeParams.agentId) {
            // console.log(entry);
            $scope.agentId = entry.name;
            $scope.mobile = entry.agent;
            $scope.email = entry.happay;
        }
    });
    // console.log(getById(b[0], 'agent'));
    SharedDataService.getAgentBookingApi($routeParams.agentId).then(function(data){
        $scope.bookings = data[0];
        console.log(data[0]);
    });
    // console.log(b);
    // $scope.bookings = b.data.bookings_list;
    // console.log($scope.bookings);
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
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Would you really like to delete this agent?')
            .content('All of the banks have agreed to forgive you your debts.')
            .ariaLabel('Lucky day')
            .ok('Yes')
            .cancel('No')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            // $scope.alert = 'You decided to get rid of your debt.';
            // console.log(agent);
            var index = $scope.agents.indexOf(agent);
            $scope.agents.splice(index, 1);
            $scope.showSimpleToast();
        }, function() {
            $scope.alert = 'You decided to keep your debt.';
        });
    };
});