angular.module('clickerApp').service('saveService', ['clickerService', '$cookies', '$window', function (clickerService, $cookies, $window) {

    this.saveGame = () => {
        $cookies.put("total", clickerService.total)
        $cookies.put("additive", clickerService.additive)
        $cookies.put("multiplier", clickerService.multiplier)
        $cookies.get("numMultipliers", clickerService.numMultipliers)
        $cookies.put("costMultiplier", clickerService.costMultiplier)
        $cookies.put("numAutoClicker", clickerService.numAutoClickers)
        $cookies.put("costAutoClicker", clickerService.costAutoClicker)
    }

    $window.onbeforeunload = this.saveGame

}])