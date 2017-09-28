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