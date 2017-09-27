angular.module('clickerApp').controller('multiplyController', ['multiplyService', 'addService', 'totalService',
    function (multiplyService, addService, totalService) {

        this.multiplyService = multiplyService

        this.multiplyAddtive = () => {
            totalService.subtractFromTotal(multiplyService.cost);
            addService.multiplyAdditive(multiplyService.multiplier)
        }



    }])