var _color = () => {
    var range = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
    var _c = '#' +range[Math.floor(Math.random() * range.length)] +
                range[Math.floor(Math.random() * range.length)] +
                range[Math.floor(Math.random() * range.length)] +
                range[Math.floor(Math.random() * range.length)] +
                range[Math.floor(Math.random() * range.length)] +
                range[Math.floor(Math.random() * range.length)]
    
    if (_c[4] == _c[5]) {
        if ((_c[4] !== '0') || (_c[4] !== 'f')) {
            return _color()
        }
    }
    return _c
}