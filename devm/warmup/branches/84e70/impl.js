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
    add: function(obj, fn, aspectFn, when, once) {
        obj.beforeAspects = [];
        obj.afterAspects = [];
        if (when === 'before') {
            obj.beforeAspects.push(aspectFn);
        } else {
            obj.afterAspects.push(aspectFn);
        }
        obj.oldFn = obj[fn];
        obj[fn] = function() {
            var beforeFunction;
            var afterFunction;
            var return_value;
            while(beforeFunction = obj.beforeAspects.pop()) {
                beforeFunction();
            }
            return_value = obj.oldFn()
            while(afterFunction = obj.afterAspects.pop()) {
                afterFunction();
            }
            return return_value;
            if(once === true) {
                obj[fn] = obj.oldFn;
            }
        }
    },
    remove: function(obj, fn, aspectFn, when) {
        obj[fn] = obj.oldFn;
    }
}
