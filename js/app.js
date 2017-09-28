angular.module('clickerApp', ['ngCookies'])
.filter('exponential', function() {
    return function(x) {
        if (x > 100000)
        {
            return x.toExponential(5)
        }
        else
        {
            return x.toFixed(2)
        }
        
    }
})
.run(['clickerService', '$cookies', function(clickerService, $cookies) {
    clickerService.total = $cookies.get("total") !== undefined ? Number($cookies.get("total")) : 0
    clickerService.additive = $cookies.get("additive") !== undefined ? Number($cookies.get("additive")) : 1

    clickerService.multiplier = $cookies.get("multiplier") !== undefined ? Number($cookies.get("multiplier")) : 1.2
    clickerService.numMultipliers = $cookies.get("numMultipliers") !== undefined ? Number($cookies.get("numMultipliers")) : 0
    clickerService.costMultiplier = $cookies.get("costMultiplier") !== undefined ? Number($cookies.get("costMultiplier")) : 10
    clickerService.disabledMultiplier = clickerService.total < clickerService.costMultiplier ? true : false
    clickerService.backgroundColorMultiplier = clickerService.total < clickerService.costMultiplier ? 'grey' : 'white'

    clickerService.numAutoClickers = $cookies.get("numAutoClicker") !== undefined ? Number($cookies.get("numAutoClicker")) : 0
    clickerService.costAutoClicker = $cookies.get("costAutoClicker") !== undefined ? Number($cookies.get("costAutoClicker")) : 100
    clickerService.disabledAutoClicker = clickerService.total < clickerService.costAutoClicker ? true : false
    clickerService.backgroundColorAutoClicker = clickerService.total < clickerService.costAutoClicker ? 'grey' : 'white'

    clickerService.disabledReset = clickerService.isInitialGameState() ? true : false
    clickerService.backgroundColorReset = clickerService.isInitialGameState() ? 'grey' : 'white'
}])