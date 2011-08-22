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
	add : function(obj,fn,aspectFn,when,once) {
		/*if (typeof obj != "object") {
			throw new TypeError("obj jest obiektem");
		}/*/
		
		if (obj==null) {
			//throw new TypeError("obj jest null");
			return;
		}
		
		if (typeof fn == "string") {
			this.__addByName(obj,fn,aspectFn,when,once);
		}
		else if (typeof fn == "regexp") {
			
		}
		else if (typeof fn == "array") {
			
		}
		else {
			throw new TypeError(fnName + " - niewłaściwy typ");
		}
	},
	
	__addByName : function(obj,fnName,aspectFn,when,once) {
		
		if (typeof obj[fnName] != "function") {
			throw new TypeError(fnName + " nie jest nazwą funkcji");
		}
		
		var funInst=obj[fnName];
		
		var args=Array.prototype.slice.apply(this,args);
	
		if (when=='before') {
			obj[fnName] = function() {
				aspectFn.apply(this,arguments);
				return funInst.apply(this,args);
			};
		}
		else if (when=='after') {
			obj[fnName] = function() {
				//funInst(this.arguments);
				var res=funInst.apply(this,arguments);
				aspectFn.apply(this,args);
				return res;
			};
		}
	},
	
	remove: function(obj,fn,aspectFn,when) {
		
	}
};


