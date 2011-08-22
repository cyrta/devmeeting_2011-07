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
var aspect;

aspect = {};

aspect.add = function(obj,fnName,aspectFn,when,once){
	if(!obj[fnName]) throw new TypeError;
	if(!obj) obj = window;
	if(!obj.__functions[fnName]){
		obj.__functions[fnName]= [];
		obj.__thatFunction[fnName] = fnName;
		obj.__functions[fnName].before = [];
		obj.__functions[fnName].after = [];
	}
	if(when=='after'){
		obj.__functions[fnName].after.push(aspectFn);
	}else{
		obj.__functions[fnName].before.unshift(aspectFn);
	}
	
	
	for(var f in __functions){
		if(f!=thatFunction){
			f();
		}else{
			var result = f();
		}
	}
	
};

aspect.remove = function(obj,fnName,aspectFn,when){
	
};

