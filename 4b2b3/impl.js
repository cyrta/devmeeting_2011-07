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
 
var _ = {};
 _.isString = function(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  };
_.isObject = function(obj) {
    return obj === Object(obj);
  };  
 
var aspect = {
	_funcArray: []
	
	};


	aspect.add = function (obj, fnName, aspectFn, when, once) {
		
		if(obj === null || obj === undefined)
			return window;	
		if (!_.isObject(obj)) 
			throw new TypeError;	
					
		if ( aspectFn === null)
			throw new TypeError;
				var now = "before";
		if (when === "after") {
			now = when;
		} else {
			aspectFn();
		}
		


		var node = { 
			fn: obj["fnName"],
			a: aspectFn,
			w: when
		}
		//dodajemy
		aspect._funcArray.push(node);
		
		// main
		
		//after
		if (now === "after") 
			aspectFn();
	};


	aspect.remove = function(obj, fnName, aspectFn, when) {

	};


if tyepefof fnName.test =='function'
	for var key in obj
		if
