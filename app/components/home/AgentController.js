MyApp.controller('AgentController', function($scope, $mdDialog, $animate, $http, SharedDataService, $location, $mdToast) {
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
    $scope.showSimpleToast = function(message) {
        $mdToast.show(
            $mdToast.simple()
            .content(message)
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
    };
    $scope.hideSpan = true;
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
    $scope.agents;
    SharedDataService.getAgentsApi().then(function(data){
        $scope.agents = data[0];
        angular.forEach($scope.agents, function (agent) {
            agent.zo_credits = parseFloat(agent.zo_credits);
            agent.total_roomnights = parseFloat(agent.total_roomnights);
        });
        $scope.total_agents = SharedDataService.getTotalAgents();
    });
    
    var a = SharedDataService.getAgents();
    console.log($scope.agents);
    $scope.addAgent = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/components/home/addagent-dialog.tmpl.html',
                parent: angular.element(document.body),
                scope: $scope.$new(),
                targetEvent: ev,
                // locals:{
                //     items: $scope.agents,
                //     parent: $scope
                // },
            })
            .then(function(answer) {
            }, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
    };
});

function DialogController($scope, $mdDialog, SharedDataService, $mdToast) {
    console.log($scope.items);
    $scope.gds = function (value) {
        if(value=='GDS-Solo') {
            $scope.happay = false;
        }
        else {
            $scope.happay = true;
        }
    }
    $scope.value = function (value) {
        if(value=='VEHICLE') {
            $scope.vehicle = true;
        }
        else {
            $scope.vehicle = false;
        }
        if (value=='DESK') {
            $scope.desk = true;
        }
        else {
            $scope.desk = false;
        }
        if (value == 'OTHER') {
            $scope.other = true;
        }
        else {
            $scope.other = false;
        }
    }
    $scope.newValue = function(value) {
        console.log(value);
    }
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $scope.agent.area = '';
        $scope.agent.id_proof = '';
        $scope.agent.id_proof_1 = '';
        $scope.agent.id_proof_2 = '';
        $scope.agent.company = '';
        $scope.agent.alt_email = '';
        $scope.agent.preferred_cities = '';
        $scope.agent.profession = '';
        $scope.agent.vehicle_type = '';
        $scope.agent.is_owner = '';
        $scope.agent.registration = '';
        $scope.agent.dob='';
        $scope.agent.advanced = "on";
        $scope.agent.alt_email = "";
        $scope.agent.alt_mobile = "";
        SharedDataService.saveAgent($scope.agent).then(function(response){
            console.log($scope.agent);
            if (response.data.success == true){
                $scope.agents.push({name:$scope.agent.name, zo_credits: 0, agent: $scope.agent.mobile, total_roomnights: 0, agent_id: response.data.agent_id});
                $scope.showSimpleToast(response.data.message);
            }
        });
        $mdDialog.hide(answer);
    };
}