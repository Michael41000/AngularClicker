angular.module('clickerApp').service('clickerService', ['$interval', function ($interval) {
    this.total = 0
    this.additive = 1;
    
    this.multiplier = 1.2
    this.costMultiplier = 10
    this.disabledMultiplier = true
    this.backgroundColorMultiplier = 'grey'

    this.numAutoClickers = 0
    
    this.costAutoClicker = 100
    this.intervals = []
    this.disabledAutoClicker = true
    this.backgroundColorAutoClicker = 'grey'

    this.addToTotal = (number) => {
        this.total += number
        if (Number(this.total.toFixed(5)) >= Number(this.costMultiplier.toFixed(5))) {
            this.enableMultiplier()
        }
        if (Number(this.total.toFixed(5)) >= Number(this.costAutoClicker.toFixed(5)))
        {
            this.enableAutoClicker()
        }
    }

    this.subtractFromTotal = (number) => {
        this.total -= number
        if (Number(this.total.toFixed(5)) < Number(this.costMultiplier.toFixed(5))) {
            this.disableMultiplier()
        }
        if (Number(this.total.toFixed(5)) < Number(this.costAutoClicker.toFixed(5)))
        {
            this.disableAutoClicker()
        }
    }

    this.addAdditive = () => {
        this.addToTotal(this.additive)
    }

    this.multiplyAdditive = () => {
        this.additive *= this.multiplier
        this.subtractFromTotal(this.costMultiplier)
        this.costMultiplier *= Math.pow(1.15, (Math.log(this.additive) / Math.log(1.2)))
    }

    this.addAutoClicker = () => {
        this.subtractFromTotal(this.costAutoClicker)
        this.numAutoClickers++
        this.intervals.push($interval(this.addAdditive, 1000))
    }

    this.enableMultiplier = () => {
        this.disabledMultiplier = false;
        this.backgroundColorMultiplier = 'white'
    }

    this.disableMultiplier = () => {
        this.disabledMultiplier = true;
        this.backgroundColorMultiplier = 'grey'
    }

    this.enableAutoClicker = () => {
        this.disabledAutoClicker = false;
        this.backgroundColorAutoClicker = 'white'
    }

    this.disableAutoClicker = () => {
        this.disabledAutoClicker = true;
        this.backgroundColorAutoClicker = 'grey'
    }

}])