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
var aspect = {
    data : []
};


aspect.add = function (obj, fnName, aspectFn, when, once) {
    var runAfter = (when === 'after');
        
    
    if (obj === null || typeof obj === 'undefined') {
        obj = window;
    }
    if (typeof obj !== 'object') {
        throw new TypeError();
    }
    
    if (!(fnName in obj)) {
        throw new TypeError();
    }
    
    
    if (!this.data[obj] && !this.data[obj][fnName]) {
        this.data[obj][fnName] = {
            before : [], 
            after  : [], 
            run    : function () {
                for (i = 0, k = before.length; i < k; i++) {
                    before[i]();
                }
                var result = fn.call(obj, Array.prototype.slice.call(arguments));
                for (i = 0, k = after.length; i < k; i++) {
                    after[i]();
                }
                return result;
            }
        }
    }
    
    var item = this.data[obj][fnName];
    if (once && item) {
        return;
    }
    
    if (!runAfter) {
        item.before.push(aspectFn);
    }
    if (runAfter) {
        item.after.push(aspectFn);
    }
    
    obj.fnName = item.run;
};


aspect.remove = function (obj, fnName, aspectFn, when) {
};

