angular.module('clickerApp').service('totalService', [function () {
    
    this.total = 0

    this.addToTotal = (number) => {
        this.total += number
        return this.total
    }

}])