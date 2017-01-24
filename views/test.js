pages.Test = (params) => {
    with (Sgfd.Base) {
        // fill body with empty elements
        for(j = 0 ; j < 400; j++) {
            var view = document.createElement('div')
            var css = {
                position: 'relative',
                height: '5%',
                width: '5%',
                float: 'left'
            }
        
            for(i in css){
                view.style[i] = css[i]
            }
            
            document.getElementsByTagName('body')[0].appendChild(view)
        }
        
        // Track movement
        var _2dPoints = []
        Node.observeAll((ev) => {
            console.log(ev)
            _2dPoints.push([ev.clientX, ev.clientY])
        })
    
        setInterval(() => {
            _process(_2dPoints)
        }, (5 * 60 * 1000))
    
        var _process = (_lst) => {
            // Run KMeans with points
            var _p = new KMeans(_lst/*, 5*/)
            _p.run(drawAllClusters/*, true, 250*/)
        }
    }
}