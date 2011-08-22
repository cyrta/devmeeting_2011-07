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
aspect.add = function (obj, fnName, aspectFn, when, once) {
    
    var myObj = obj || window;
    
    if (typeof myObj[fnName] != 'function') { 
        throw TypeError( fnName  + ' not in  obj');
    }
    if (! myObj.__functions) myObj.__functions = {}
    myObj.__functions[fnName] = myObj[fnName];
    myObj[fnName] = function () {
        var res
        if (when == 'after')
            res = myObj.__functions[fnName].apply(myObj, arguments);
        
        if (!once || !this.aspectExec) {
            aspectFn();
            this.aspectExec =  true;
        }
        
        if (when != 'after')
            res = myObj.__functions[fnName].apply(myObj, arguments);
        
        return res;
    }
   
};
aspect. remove = function (obj, fnName, aspectFn, when) {

    var myObj = obj || window;
    
    if (typeof myObj[fnName] != 'function') { 
        throw TypeError( fnName  + ' not in  obj');
    }
    
    myObj[fnName] = myObj.__functions[fnName];
    
};

