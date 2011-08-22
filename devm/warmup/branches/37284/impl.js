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


function getAspectObj(obj, fnName) {
	if(typeof obj === "undefined" || obj === null)
		obj=window;

	console.log("!!!", obj, fnName, obj[fnName], typeof obj[fnName]);

	if(typeof obj[fnName] !== "function")
		throw new TypeError("ni ma: "+fnName+" "+typeof fnName);

	if("undefined" === typeof obj.__aspect)
		obj.__aspect={};
	
	if("undefined" === typeof obj.__aspect[fnName]) {
		obj.__aspect[fnName]={
			fn: obj[fnName],
			before: [],
			after: [],
			once: {
				before: [],
				after: []
			}
		}

		var asp=obj.__aspect[fnName];

		obj[fnName]=function() {
			var i=0;
			
			for(i=0; i < asp.before.length; i++)
				asp.before[i] && asp.before[i].call(this);
			
			while(f=asp.once.before.pop())
				f && f.call(this);
			
			var ret=asp.fn.apply(this, arguments);
			
			for(i=0; i < asp.after.length; i++)
				asp.after[i] && asp.after[i].call(this);
			
			while(f=asp.once.after.pop())
				f && f.call(this);
			
			return ret;
		}
	}
	
	return asp=obj.__aspect[fnName];
}


function checkWhenCond(when) {
	if(when !== "before" && when !== "after")
		throw new TypeError("when? "+when);
}


var aspect={
	add: function(obj, fnName, aspectFn, when, once) {
		when=when || "before";
		once=once || false;
		
		if(typeof aspectFn !== "function")
			throw new TypeError("not fn");
		
		/// TODO: once
		checkWhenCond(when);
		var asp=getAspectObj(obj, fnName);
		if(once)
			asp.once[when].push(aspectFn);
		else
			asp[when].push(aspectFn);
	},
	remove: function(obj, fnName, aspectFn, when) {
		checkWhenCond(when);
		var asp=getAspectObj(obj, fnName);
		
		console.log(asp);
		
		for(var i in asp[when]) {
			if(asp[when][i] === aspectFn)
//				asp[when].remove(i);
				delete asp[when][i];
		}
		console.log("###", asp);		
	}
}


