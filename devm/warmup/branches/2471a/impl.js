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

function getGlobal() {
    return (function() {
        return this;
    }).call(null);
}

var aspect = {

    beforeAspects : {},
    afterAspects : {},
    origFns:{},


    add: function(obj, fnName, aspectFn, when, once) {
        if (!obj) {
            obj = getGlobal();
        }

        if (typeof(obj) != 'object') {
            throw new TypeError()
        }

        if (!obj.hasOwnProperty(fnName)) {
            throw new TypeError()
        }

        if (when === 'after') {
            if (!this.afterAspects[fnName])
                this.afterAspects[fnName] = []

            var aspects = this.afterAspects[fnName]
        } else {
            if (!this.beforeAspects[fnName])
                this.beforeAspects[fnName] = []

            var aspects = this.beforeAspects[fnName] || []
        }

        aspects.push(
            {
                aspectFn: aspectFn,
                once: once
            }
        )

        this.origFns[fnName] = obj[fnName]

        obj[fnName] = function() {
            var that = this
            var beforeAspects = aspect.beforeAspects[fnName] || []
            var afterAspects = aspect.afterAspects[fnName] || []

            function execAspects(aspects) {
                $.each(aspects, function(i, a) {
                    log.info("exec aspect")
                    a.aspectFn()
                })
            }

            log.info("exec before aspects")
            execAspects(beforeAspects)

            log.info("exec orig")
            aspect.origFns[fnName]()

            log.info("exec after aspects")
            execAspects(afterAspects)
        }

    },

    remove: function(obj, fnName, aspectFn, when) {
        if (!obj) {
            obj = getGlobal();
        }

        if (typeof(obj) != 'object') {
            throw new TypeError()
        }

        if (!obj.hasOwnProperty(fnName)) {
            throw new TypeError()
        }

        if (when == 'after') {
            var aspects = aspect.afterAspects[fnName]
        } else {
            var aspects = aspect.beforeAspects[fnName]
        }

        if(aspects.length > 0){
            var toDel;

            $.each(aspects,function(i, a){
                if(a.aspectFn === aspectFn){
                    
                }
            })
        }
    }
};



