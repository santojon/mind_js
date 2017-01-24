var drawAllClusters = (_p) => {
    // clear old clusters (last iterations)
    var dots = document.getElementsByClassName('clusterDot')
    while (dots.length > 0) {
        for(var i = 0 ; i < dots.length; i++) {
            dots[i].parentNode.removeChild(dots[i])
        }
        dots = document.getElementsByClassName('clusterDot')
    }

    // get all
    var _all = _p.getAllClusters()

    // get the biggest one
    var _biggest = _p.getBiggestCluster()

    _all.forEach((c) => {
        // the biggest
        if ((c.mean[0] === _biggest.mean[0]) && (c.mean[1] === _biggest.mean[1])) {
            drawCluster(c, { color: '#ff0000', size: 15 })
        }
        // others
        else {
            drawCluster(c, { color: _color(), size: 15 })
        }
    })
}

var drawCluster = (_cluster, op) => {
    // centroid color & size
    var _op = op || { color: '#808080', size: 10 }

    // draw centroid
    drawPoint(_cluster.mean[0], _cluster.mean[1], _op)

    // other points size
    _op.size = 5

    // other points
    _cluster.assignment.forEach((p) => {
        // draw point
        drawPoint(p[0], p[1], _op)
    })
}

var drawPoint = (x, y, op) => {
    var _op = op || { color: '#c0c0c0', size: 5 }
    var view = document.createElement('div')
    var css = {
        'background-color': _op.color,
        position: 'absolute',
        height: _op.size + 'px',
        width: _op.size + 'px',
        top: (y - (_op.size / 2)) + 'px',
        left: (x - (_op.size / 2)) + 'px'
    }

    for(i in css){
        view.style[i] = css[i]
    }

    view.className = 'clusterDot'
    document.getElementsByTagName('body')[0].appendChild(view)
}