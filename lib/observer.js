class Observer {
    constructor(el) {
        this.el = el
    }

    observe(ev, func) {
        var _ob = (ev) => {
            console.log(ev)
        }

        if (ev) {
            this.el.addEventListener(ev, func || _ob)
        } else {
            this.el.addEventListener('click', func || _ob)
            this.el.addEventListener('mouseover', func || _ob)
        }
    }

    static observeAll(ev, func) {
        // get all except script and code
        var elements = document.body.getElementsByTagName('*')
        
        for(var i = 0; i < elements.length; i++) {
            var current = elements[i]
            // Check the element has no children
            if(current.children.length === 0) {
                // get it only if is not a script block
                if (current.outerHTML.indexOf('<script') < 0) {
                    current.observe(ev, func)
                }
            }
        }
    }
}

(() => {
    Node.prototype.observe = (ev, func) => {
        new Observer(this).observe(ev, func)
    }

    Node.observeAll = (func, ev) => {
        Observer.observeAll(ev, func)
    }
})()