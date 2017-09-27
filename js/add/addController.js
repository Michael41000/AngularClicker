angular.module('clickerApp').controller('addController', ['addService', 'totalService', function(addService, totalService) {
    
    this.addService = addService

    this.addToTotal = () => {
        console.log('hello')
        totalService.addToTotal(this.addService.additive)
    }

}])