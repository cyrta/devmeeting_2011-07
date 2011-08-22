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
  
  add: function (obj, fnName, aspectFn, when, once) {
    obj = obj || (function () { return this; }).apply(null);

    if (typeof obj !== 'object') { throw new TypeError(); }
    if (typeof obj[fnName] === 'undefined') { throw new TypeError(); }
    
    if (when === 'before') {
      this.aspectsBefore[fnName] = aspectFn;
    } else if (when === 'after') {
      this.aspectsAfter[fnName] = aspectFn;
    }
    

    this.aspectsOriginal[fnName] = window[fnName];

    obj[fnName] = function () {
      //for (fun in this.aspectsBefore) {
        this.aspectsBefore[fnName]();
      //}
      this.aspectsOriginal[fnName]();
      //for (fun in this.aspectsAfter) {
        this.aspectsBefore[fnName]();
      //}
    }
  },

  remove: function (obj, fnName, aspectFn, when) {
  },

  aspectsBefore: {},
  aspectsAfter: {},

  aspectsOriginal: {} 
};


