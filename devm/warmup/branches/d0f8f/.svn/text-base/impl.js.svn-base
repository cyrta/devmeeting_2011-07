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
};

aspect.add = function(obj, fnName, aspectFn, when, once) {
	when = when || 'before'; // 'before' is default
	once = once || false; // once default is false

	console.log("add "+when+" "+fnName+" "+aspectFn);

	if (obj == null) {
		obj = window;
	}
	
	if (! obj[fnName]) {
		throw new TypeError("fuck!");
	}
	
	var origFunc = obj[fnName];
	
	if (! obj[fnName].replaced) { 
		obj[fnName] = function() {
			console.log('calling fn');
			
			var before = obj[fnName]['before'];
			if (before !== undefined) {
				for (var f in before) {
					if (before[f] !== undefined) {
						before[f]();
						if (before[f].once) {
							console.log('once found');
							before[f] = undefined;
						}
					}
				}
			}
			
			var ret = origFunc.apply(obj, arguments);
			
			var after = obj[fnName]['after'];
			if (after != undefined) {
				for (var f in after) {
					if (after[f] !== undefined) {
						after[f]();
						if (after[f].once) {
							after[f] = undefined;
						}
					}
				}
			}
			
			return ret;
		};
	}
	
	
	aspectFn.once = once;
	obj[fnName][when] = obj[fnName][when] || [];
	obj[fnName][when].push(aspectFn);
	console.log("list has so far: "+fnName+" "+when+" "+obj[fnName][when].length);
	
	
};

aspect.remove = function(obj, fnName, aspectFn, when) {
	var l = obj[fnName][when];
	for (var k in l) {
		if (l[k] == aspectFn) {
			l[k] = undefined;
		}
	}
};