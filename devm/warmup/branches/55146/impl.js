(function() {
  var Aspect;
  Aspect = (function() {
    function Aspect() {}
    Aspect.prototype.add = function(obj, fnName, aspectFn, when_, callOnce) {
      var callAfter, callBefore, canCall, fn;
      if (callOnce == null) {
        callOnce = false;
      }
      obj = this.validateObj(obj);
      canCall = true;
      callBefore = when_ === 'before';
      callAfter = when_ === 'after';
      fn = obj[fnName];
      return obj[fnName] = function() {
        var result;
        if (callBefore && canCall) {
          aspectFn();
        }
        result = fn.apply(obj, arguments);
        if (callAfter && canCall) {
          aspectFn();
        }
        canCall = !callOnce;
        return result;
      };
    };
    Aspect.prototype.remove = function(obj, fnName, aspectFn, when_) {
      return obj = this.validateObj(obj);
    };
    Aspect.prototype.validateObj = function(obj) {
      if (obj === null) {
        obj = window;
      }
      if (typeof obj !== 'object') {
        throw new TypeError();
      }
      return obj;
    };
    return Aspect;
  })();
  window.aspect = new Aspect();
}).call(this);
