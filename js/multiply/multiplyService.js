angular.module('clickerApp').service('multiplyService', [function (addService) {
   
    this.multiplier = 1.2
    this.cost = 10

    this.disabled = true
    this.background_color = 'grey'

    this.enable = () => {
        this.disabled = false;
        this.background_color = 'white'
    }

    this.disable = () => {
        this.disabled = true;
        this.background_color = 'grey'
    }

}])