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
	add: function(obj, fnName, aspectFn, when, once){
		once = once || false;
		when = when || "before";

		if(typeof obj !== "object" && obj != null && typeof obj !== "undefined"){
			throw new TypeError("obj is no Object");
		}
		
		var global = (function(){ return this; })();
		obj = obj || global;
		
		obj.once = false;
		
		if(typeof fnName === "object" && fnName.length){
			
			for(var i = 0, len = fnName.length; i < len; ++i){

				fun = fnName[i];
				
				if(typeof obj[fun] !== "function") {
					throw new TypeError("fnName is not a function");
				}
				
				var old = obj[fun];
				obj[fun] = function() {
					(when === "before") && aspectFn();
					var result = old.apply(this, arguments);
					(when === "after") && aspectFn();
					
					return result;
				}
			}
		} else {

			if(typeof obj[fnName] !== "function") {
				throw new TypeError("fnName is not a function");
			}
			
			var old = obj[fnName];
			if(obj.once){
				var result = old.apply(this, arguments);
				return result;
			} else {
				obj[fnName] = function() {
					(when === "before") && aspectFn();
					var result = old.apply(this, arguments);
					(when === "after") && aspectFn();
					
					return result;
				}
			}
		}
		
		obj.once = once;
		
	},
	remove: function(obj, fnName, aspectFn, when){
		
	}
};