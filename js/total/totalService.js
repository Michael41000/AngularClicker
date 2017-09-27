angular.module('clickerApp').service('totalService', ['multiplyService', function (multiplyService) {
    
    this.total = 0

    this.addToTotal = (number) => {
        this.total += number
        if (this.total >= 10)
        {
            multiplyService.enable();
        }
    }

    this.subtractFromTotal = (number) => {
        this.total -= number
        if (this.total < 10)
        {
            multiplyService.disable()
        }
    }

}])