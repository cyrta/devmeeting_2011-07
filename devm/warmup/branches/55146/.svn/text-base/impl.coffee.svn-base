class Aspect

    add: (obj, fnName, aspectFn, when_, callOnce=no) ->
        obj = @validateObj(obj)

        # set initial state
        canCall = yes
        callBefore = when_ == 'before'
        callAfter = when_ == 'after'

        # remember function
        fn = obj[fnName]

        # add aspect
        obj[fnName] = ->
            aspectFn() if callBefore and canCall
            result = fn.apply(obj, arguments)
            aspectFn() if callAfter and canCall

            canCall = not callOnce

            return result

    remove: (obj, fnName, aspectFn, when_) ->
        obj = @validateObj(obj)

    validateObj: (obj) ->
        obj = window if obj is null
        if typeof obj != 'object'
            throw new TypeError()

        return obj


window.aspect = new Aspect()
