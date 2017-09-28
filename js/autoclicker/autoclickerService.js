angular.module('clickerApp').service('autoclickerService', ['$interval', function ($interval) {
    
    this.numAutoClickers = 0

    this.cost = 100

    this.intervals = []

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

    this.addAutoClicker = (functionToRepeat) => {
        this.numAutoClickers++
        this.intervals.push($interval(functionToRepeat, 1000))
    }


}])