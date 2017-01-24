/**
 * Class used to run the K-Means algorithm
 */
class KMeans {
    /**
     * Create the KMeans object
     * @param data: the dataset to run K-Means (array of xy pairs (as array))
     * @param k: the number of centroids to be used
     */
    constructor(data, k) {
        this.k = k || 3
        this.data = data || [[0, 0]]
        this.means = []
    }

    /**
     * Calculate the ranges from extremes
     * @param extremes: the extremes for each xy pair, got from data
     */
    getDataRanges(extremes) {  
        var ranges = []
        for (var dimension in extremes) {
            ranges[dimension] = extremes[dimension].max - extremes[dimension].min
        }
        this.dataRange = ranges
        return ranges
    }

    /**
     * Calculate extremes from data
     */
    getDataExtremes() {
        var extremes = []
        for (var i in this.data) {
            var point = this.data[i]
            for (var dimension in point) {
                if (!extremes[dimension]) {
                    extremes[dimension] = { min: 1000000, max: 0 }
                }

                if (point[dimension] < extremes[dimension].min) {
                    extremes[dimension].min = point[dimension]
                }

                if (point[dimension] > extremes[dimension].max) {
                    extremes[dimension].max = point[dimension]
                }
            }
        }
        this.dataExtremes = extremes
        return extremes
    }

    /**
     * Init the object (extremes, ranges, means etc)
     */
    initMeans() {
        this.getDataRanges(this.getDataExtremes())

        while (this.k--) {
            var mean = []
            for (var dimension in this.dataExtremes) {
                mean[dimension] = this.dataExtremes[dimension].min + (Math.random() * this.dataRange[dimension])
            }
            this.means.push(mean)
        }
    }

    /**
     * Assign points in data to centroids
     */
    makeAssignments() {
        this.assignments = []

        for (var i in this.data) {
            var point = this.data[i]
            var distances = []

            for (var j in this.means) {
                var mean = this.means[j]
                var sum = 0

                for (var dimension in point) {
                    var difference = point[dimension] - mean[dimension]
                    difference *= difference
                    sum += difference
                }
                distances[j] = Math.sqrt(sum)
            }
            this.assignments[i] = distances.indexOf(Math.min.apply(null, distances))
        }
    }

    /**
     * Move the centroids to fit data
     */
    moveMeans() {
        this.makeAssignments()

        var sums = Array(this.means.length)
        var counts = Array(this.means.length)
        var moved = false

        for (var j in this.means) {
            counts[j] = 0
            sums[j] = Array(this.means[j].length)
            for (var dimension in this.means[j]) {
                sums[j][dimension] = 0
            }
        }

        for (var point_index in this.assignments) {
            var mean_index = this.assignments[point_index]
            var point = this.data[point_index]
            var mean = this.means[mean_index]

            counts[mean_index]++

            for (var dimension in mean) {
                sums[mean_index][dimension] += point[dimension]
            }
        }

        for (var mean_index in sums) {
            if (0 === counts[mean_index]) {
                sums[mean_index] = this.means[mean_index]

                for (var dimension in this.dataExtremes) {
                    sums[mean_index][dimension] = this.dataExtremes[dimension].min + (Math.random() * this.dataRange[dimension])
                }
                continue
            }

            for (var dimension in sums[mean_index]) {
                sums[mean_index][dimension] /= counts[mean_index]
            }
        }

        if (this.means.toString() !== sums.toString()) {
            moved = true
        }

        this.means = sums
        return moved
    }

    /**
     * Get all the clusters
     * @return a list of objects with the mean and the assigned poits of cluster
     */
    getAllClusters() {
        var res = []
        var assignments = []

        this.means.forEach((m, i) => {
            assignments.push([])
            this.assignments.forEach((a, j) => {
                if (a === i) {
                    assignments[i].push(this.data[j])
                }
            })
        })

        assignments.forEach((a, i) => {
            res[i] = { mean: this.means[i], assignment: a }
        })
        return res
    }

    /**
     * Get the larger cluster (more assignments)
     * @return an object with the mean and the assigned poits of cluster
     */
    getBiggestCluster() {
        var max = 0
        var cluster
        var clusters = this.getAllClusters()

        clusters.forEach((c) => {
            if (c.assignment.length > max) {
                cluster = c
                max = c.assignment.length
            }
        })

        return cluster
    }

    /**
     * The K-Means runner
     * Runs K-Means until centroids stop to move
     * @param cbk: a callback to run when centroids stop to move
     * @param steps: a boolean to trigger callback for each step, if set to true
     * @param mvDelay: time (in millis) to delay each centroids movement
     */
    run(cbk, steps, mvDelay) {
        this.initMeans()
        this.makeAssignments()

        // function to try to move means
        // and verify if it moves
        var runMoves = () => {
            var moved = this.moveMeans()
            if (moved) {
                if (steps && cbk) cbk(this)
                setTimeout(() => {
                    runMoves()
                }, mvDelay || 500)
            } else {
                if (cbk) cbk(this)
            }
        }

        // try to move means
        setTimeout(() => {
            runMoves()
        }, mvDelay || 500)
    }
}