angular.module('clickerApp').controller('multiplyController', ['multiplyService', 'addService', function (multiplyService, addService) {

        this.multiplyService = multiplyService

        this.multiplyAdditive = () => {
            addService.multiplyAdditive(this.multiplyService.multiplier, this.multiplyService.cost)
            this.multiplyService.cost *= Math.pow(1.15, (Math.log(addService.additive) / Math.log(1.2)))
        }
        



    }])