angular.module('clickerApp').service('addService', ['totalService', function (totalService) {
    
    this.additive = 1;

    this.multiplyAdditive = (number) => {
        this.additive *= number
    }

    this.addToTotal = () => {
        totalService.addToTotal(this.additive)
    }

}])