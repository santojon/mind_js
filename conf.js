var appConfig = {
    front: {
        scripts: [
            'utils',
            'drawcluster'
        ]
    },
    back: {
        services: ['test'],
        controllers: ['test'],
        views: ['test']
    },
    conf: {
        appName: 'Javascript AI algorithms tests',
        dependencies: [
            'lib/observer.js',
            'lib/kmeans.js'
        ],
        bootstrap: false
    }
}