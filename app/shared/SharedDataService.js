MyApp.service('SharedDataService', function($http) {
    var agents = [];
    var agent_booking = [];
    var count;
    var agent;
    var getAgentsApi = function() {

        return $http.get('http://localhost:8081/api/rep/agents').
        then(function(response) {
            agents.push(response.data.agents);
            count = response.data.count;
            return agents;
        });
    }
    var getAgents = function() {
        return agents;
    }
    var getAgent = function() {
        return $http.post('http://localhost:8081/api/rep/agent').
        then(function(response) {
            return response;
        });
    }
    var getAgentBookingApi = function(agent_id) {
        agent_booking = [];
        var data = {'agent_id': agent_id};
        return $http.post('http://localhost:8081/api/rep/booking', data).
        then(function(response) {
            // console.log(response);
            agent_booking.push(response.data.bookings_list);
            return agent_booking;
        });
    }
    var getTotalAgents = function(){
        return count;
    }
    var saveAgent = function(agent) {
        console.log(agent);
        return $http.post('http://localhost:8081/api/rep/agent', agent).
        then(function(response) {
            if (response.data.success==true) {
                console.log(agent);
                // agents.push(agent);
            }
            return response;
        });
    }
    var getSelectedCity = function(city) {
        return city;
    }
    return {
        getAgentsApi : getAgentsApi,
        getAgents : getAgents,
        getAgentBookingApi : getAgentBookingApi,
        getTotalAgents : getTotalAgents,
        saveAgent : saveAgent,
        getAgent: getAgent
    };
});