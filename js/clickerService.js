angular.module('clickerApp').service('clickerService', ['$interval', '$cookies', '$timeout', '$window', function ($interval, $cookies, $timeout, $window) {
    this.total = $cookies.get("total") !== undefined ? Number($cookies.get("total")) : 0
    this.additive = $cookies.get("additive") !== undefined ? Number($cookies.get("additive")) : 1

    this.multiplier = $cookies.get("multiplier") !== undefined ? Number($cookies.get("multiplier")) : 1.2
    this.costMultiplier = $cookies.get("costMultiplier") !== undefined ? Number($cookies.get("costMultiplier")) : 10
    this.disabledMultiplier = true
    this.backgroundColorMultiplier = 'grey'

    this.numAutoClickers = $cookies.get("numAutoClicker") !== undefined ? Number($cookies.get("numAutoClicker")) : 0
    this.costAutoClicker = $cookies.get("costAutoClicker") !== undefined ? Number($cookies.get("costAutoClicker")) : 100

    this.disabledAutoClicker = true
    this.backgroundColorAutoClicker = 'grey'

    this.disabledReset = true
    this.backgroundColorReset = 'grey'

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
        this.subtractFromTotal(this.costMultiplier, () => {
            this.costMultiplier *= Math.pow(1.15, (Math.log(this.additive) / Math.log(1.2)))
        })

    }

    this.addAutoClicker = () => {
        this.subtractFromTotal(this.costAutoClicker)
        this.numAutoClickers++
        this.intervals.push($interval(this.addAdditive, 1000))
    }

    this.resetGame = () => {
        this.total = 0

        this.additive = 1

        this.multiplier = 1.2
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
        $cookies.remove("costMultiplier")
        $cookies.remove("numAutoClicker")
        $cookies.remove("costAutoClicker")

        this.disableReset()
    }

    this.saveGame = () => {
        $cookies.put("total", this.total)
        $cookies.put("additive", this.additive)
        $cookies.put("multiplier", this.multiplier)
        $cookies.put("costMultiplier", this.costMultiplier)
        $cookies.put("numAutoClicker", this.numAutoClickers)
        $cookies.put("costAutoClicker", this.costAutoClicker)
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

    $window.onbeforeunload = () => {
        this.saveGame()
    }




}])