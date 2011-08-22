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
	add: function(obj, fnName, aspectFn, when, once) {
		if (obj === null || obj === undefined)
			obj = window;
		else if (typeof obj != 'object')
			throw new TypeError();
		
		if (typeof fnName.test == 'function')
		{
			for (var key in obj) {
				if (typeof obj[key] == 'function' && fnName.test(key))
					aspect.add(obj, key, aspectFn, when, once);
			}
			return;
		}
		else if (typeof fnName == 'object') {
			$(fnName).each( function(index) {
				aspect.add(obj, fnName[index], aspectFn, when, once);
			} );
			return;
		}
		
		var originalFn = obj[fnName];
		
		if (typeof originalFn != 'function')
			throw new TypeError();
		
		var newFn = function() {
			if (when != 'after')
				aspectFn();
			var result = originalFn.apply(this, arguments);
			if (when == 'after')
				aspectFn();
			if (once === true)
				aspect.remove(this, fnName, aspectFn, when);
			return result;
		}

		obj[fnName] = newFn;
		obj[fnName].originalFn = originalFn;
		obj[fnName].aspectFn = aspectFn;
	},
	
	remove: function(obj, fnName, aspectFn, when) {
		var owner = (typeof obj == 'null' || typeof obj == 'undefined') ? window : obj;
		if (owner[fnName].aspectFn == aspectFn)
			owner[fnName] = owner[fnName].originalFn;
		else {
			var fn = owner[fnName];
			while (fn.originalFn.aspectFn != aspectFn)
				fn = fn.originalFn;
			fn[originalFn] = fn.originalFn.originalFn;
			/*if (owner[fnName].originalFn.aspectFn == aspectFn) {
			// trollface :D
			owner[fnName].originalFn = owner[fnName].originalFn.originalFn;*/
		}
		/*else
			console.log('Fffuuu!');*/
	}
};

