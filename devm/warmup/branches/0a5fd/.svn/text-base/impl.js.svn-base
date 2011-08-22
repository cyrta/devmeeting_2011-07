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

aspect.add = function(obj, fnName, aspectFn, when, once) {
	if (obj == null || typeof obj === 'undefined') {
		obj = window;
	}
	
	if(typeof obj !== 'object') {
		throw new TypeError('obj is not an obj');
	}
	
	if(typeof obj[fnName] === 'undefined') {
		throw new TypeError('fnName nie jest metoda obj');
	}
	
	if(when !== 'before') {
		when = 'after';
	}
	
	obj._aspectFns = obj._aspectFns || [];
	var tmp = obj[fnName];
	var flag = 1;
	
	obj[fnName] = function(arguments) {
		var res = null;
		if(when == 'before') {
			if(flag) aspectFn();
			res = tmp.call(obj, arguments);
		} else {
			res = tmp.call(obj, arguments);
			if(flag) aspectFn();
		}
		
		if(once) flag = 0;
		
		return res;
	}
}

aspect.remove = function(obj, fnName, aspectFn, when) {
	
};

