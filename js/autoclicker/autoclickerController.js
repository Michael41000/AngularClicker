angular.module('clickerApp').controller('autoclickerController', ['autoclickerService', 'totalService', 'addService', function(autoclickerService, totalService, addService) {
    
    this.autoclickerService = autoclickerService

    this.addAutoClicker = () => {
        totalService.subtractFromTotal(autoclickerService.cost)
        this.autoclickerService.addAutoClicker(addService.addToTotal)
    }

}])