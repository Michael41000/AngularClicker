angular.module('clickerApp').service('addService', ['totalService', function (totalService) {
    
    this.additive = 1;

    this.multiplyAdditive = (number, cost) => {
        this.additive *= number
        totalService.subtractFromTotal(cost)
    }

    this.addToTotal = () => {
        totalService.addToTotal(this.additive)
    }

}])