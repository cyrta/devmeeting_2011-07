/*
Stwórz obiekt aspect z następującymi metodami:
add, która ma za zadanie podpiąć funkcję aspectFn pod wykonanie metody fnName w obiekcie obj. 
Metoda przyjmuje następujące parametry:
   obj – referencja do obiektu (w przypadku null/undefined – odwołanie do obiektu globalnego)
   fnName – nazwa funkcji (string || array || regexp)
   aspectFn – funkcja 'aspektowa'
   when – string 'after' lub 'before' (domyślnie 'before')
   once – boolean; jeśli true aspekt wykona się tylko raz (domyślnie false)
   
remove – usuwa wcześniej zadeklarowany aspekt; parametry wejściowe: 
   obj, 
   fnName, 
   aspectFn, 
   when 
   
Jeśli fnName nie jest metodą obiektu obj, metody rzucają TypeError.
Jeśli obj nie wskazuje na obiekt - TypeError (jeśli obj null/undefined to ma wskazywać na obiekt globalny)
fnName może być tablicą funkcji bądź wyrażeniem regularnym, np. /get.+/
 */
var aspect = {};
(function(){


aspect.add = function(obj, fnName, aspectFn, when, once){

    obj = obj || (function(){return this}).apply(null);
    var before = when==='after'?false:true;
    
    if(typeof obj !== 'object'){
        throw new TypeError('obj is not an object');
    }

    if(!(fnName instanceof Array) && typeof obj[fnName] !== 'function'){
        throw new TypeError('fnName is not a function');
    }
    
    var oldFn = obj[fnName];
    
    
    var newFn = function(){
        var args = Array.prototype.slice.apply(this,args);
        if(before){
            aspectFn.apply(this,args);
        }

        var result = oldFn.apply(this,arguments);
        if(!before){
            aspectFn.apply(this,args);
        }
        if(once){
            aspect.remove(obj, fnName, aspectFn, when);
        }
        return result;
    };
    newFn._old = oldFn;
    newFn._isBefore = before;
    if(oldFn._old){
        oldFn._new = newFn;
    }
    newFn._removeMe = function(){
            obj[fnName] = oldFn;
            
    }
    
    obj[fnName] = newFn;
    
}
aspect.remove = function(obj, fnName, aspectFn, when){
    obj[fnName]._removeMe(obj, fnName, aspectFn, when);
}

})();
