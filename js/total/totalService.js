angular.module('clickerApp').service('totalService', ['multiplyService', 'autoclickerService', function (multiplyService, autoclickerService) {
    
    this.total = 0

    this.addToTotal = (number) => {
        this.total += number
        if (Number(this.total.toFixed(5)) >= Number(multiplyService.cost.toFixed(5)))
        {
            multiplyService.enable()
        }
        if (Number(this.total.toFixed(5)) >= Number(autoclickerService.cost.toFixed(5)))
        {
            autoclickerService.enable()
        }
    }

    this.subtractFromTotal = (number) => {
        this.total -= number
        if (Number(this.total.toFixed(5)) < Number(multiplyService.cost.toFixed(5)))
        {
            multiplyService.disable()
        }
        if (Number(this.total.toFixed(5)) < Number(autoclickerService.cost.toFixed(5)))
        {
            autoclickerService.disable()
        }
    }

}])