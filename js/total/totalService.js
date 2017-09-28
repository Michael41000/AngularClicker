angular.module('clickerApp').service('totalService', ['multiplyService', 'autoclickerService', function (multiplyService, autoclickerService) {
    
    this.total = 0

    this.addToTotal = (number) => {
        this.total += number
        if (this.total >= 10)
        {
            multiplyService.enable()
        }
        if (this.total >= 100)
        {
            autoclickerService.enable()
        }
    }

    this.subtractFromTotal = (number) => {
        this.total -= number
        if (this.total < 10)
        {
            multiplyService.disable()
        }
        if (this.total < 100)
        {
            autoclickerService.disable()
        }
    }

}])