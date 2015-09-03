MyApp.controller('EditController', function($scope, SharedDataService, $routeParams) {
        var b = SharedDataService.getAgents();
        // console.log(b[0]);

        b[0].forEach(function(entry){
            if(entry.agent_id == $routeParams.agentId) {
                console.log(entry);
                $scope.user = {
                    title : entry.name,
                    email : entry.happay,
                    submissionDate : entry.time_create,
                    address : entry.address,
                    city : entry.city,
                    locality : entry.locality,
                    number : entry.agent,
                    city_rep : entry.city_rep,
                    inductor : entry.inductor,
                    alt_email : entry.alt_email,
                    gender : entry.gender,
                    dob : entry.date_of_birth,
                    fathers_name : entry.fathers_name,
                    id_type : entry.id_proof_type
                }
            }
        });
    })
    .config(function($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });