angular.module('clickerApp').service('clickerService', ['$interval', '$cookies', '$timeout', '$window', function ($interval, $cookies, $timeout, $window) {
    this.total
    this.additive

    this.multiplier
    this.numMultipliers
    this.costMultiplier
    this.disabledMultiplier
    this.backgroundColorMultiplier

    this.numAutoClickers
    this.costAutoClicker
    this.disabledAutoClicker
    this.backgroundColorAutoClicker

    this.disabledReset
    this.backgroundColorReset

    this.addToTotal = (number) => {
        this.total += number
        this.enableReset()
        if (Number(this.total.toFixed(5)) >= Number(this.costMultiplier.toFixed(5))) {
            this.enableMultiplier()
        }
        if (Number(this.total.toFixed(5)) >= Number(this.costAutoClicker.toFixed(5))) {
            this.enableAutoClicker()
        }
    }

    this.subtractFromTotal = (number, functionToCallBeforeChecks) => {
        this.total -= number
        if (functionToCallBeforeChecks) functionToCallBeforeChecks()
        if (this.total < this.costMultiplier) {
            this.disableMultiplier()
        }
        if (this.total < this.costAutoClicker) {
            this.disableAutoClicker()
        }
    }

    this.addAdditive = () => {
        this.addToTotal(this.additive)
    }

    this.multiplyAdditive = () => {
        this.additive *= this.multiplier
        this.multiplier *= Math.pow(2, 1 / 7)
        this.numMultipliers++
        this.subtractFromTotal(this.costMultiplier, () => {
            this.costMultiplier *= Math.pow(1.15, this.numMultipliers)
        })
    }

    this.addAutoClicker = () => {
        this.numAutoClickers++
        this.subtractFromTotal(this.costAutoClicker, () => {
            this.costAutoClicker *= Math.pow(1.15, this.numAutoClickers)
        })
        this.intervals.push($interval(this.addAdditive, 1000))
    }

    this.resetGame = () => {
        this.total = 0

        this.additive = 1

        this.multiplier = 1.2
        this.numMultipliers = 0
        this.costMultiplier = 10
        this.disableMultiplier()

        this.numAutoClickers = 0
        this.costAutoClicker = 100
        this.disableAutoClicker()
        while (this.intervals.length > 0) {
            $interval.cancel(this.intervals.pop())
        }

        $cookies.remove("total")
        $cookies.remove("additive")
        $cookies.remove("multiplier")
        $cookies.remove("numMultipliers")
        $cookies.remove("costMultiplier")
        $cookies.remove("numAutoClicker")
        $cookies.remove("costAutoClicker")

        this.disableReset()
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

    this.enableReset = () => {
        this.disabledReset = false;
        this.backgroundColorReset = 'white'
    }

    this.disableReset = () => {
        this.disabledReset = true;
        this.backgroundColorReset = 'grey'
    }

    this.intervals = []
    for (let i = 0; i < this.numAutoClickers; i++) {
        $timeout(() => {
            this.intervals.push($interval(this.addAdditive, 1000))
        }, Math.random() * 1000)
    }

    this.isInitialGameState = () => {
        if (this.total !== 0) return false

        if (this.additive !== 1) return false

        if (this.multiplier !== 1.2) return false

        if (this.costMultiplier !== 10) return false

        if (this.disabledMultiplier !== true) return false

        if (this.backgroundColorMultiplier !== 'grey') return false

        if (this.numAutoClickers !== 0) return false

        if (this.costAutoClicker !== 100) return false

        if (this.disabledAutoClicker !== true) return false

        if (this.backgroundColorAutoClicker !== 'grey') return false

        if (this.intervals.length !== 0) return false

        return true
    }

}])