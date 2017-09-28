angular.module('clickerApp').controller('multiplyController', ['multiplyService', 'addService', function (multiplyService, addService) {

        this.multiplyService = multiplyService

        this.multiplyAdditive = () => {
            addService.multiplyAdditive(this.multiplyService.multiplier, this.multiplyService.cost)
        }
        



    }])