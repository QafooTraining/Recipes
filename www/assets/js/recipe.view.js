(function( global ) {

    view = function() {
    };

    /**
     * Map ingredients from recipes
     *
     * @param array recipes
     */
    view.mapIngredients = function(docs) {
        ingredients = view.map(
            docs,
            function(doc) {
                // @TODO: Write map function
            }
        );

        return view.reduce(
            ingredients,
            function (key, values, rereduce) {
                // @TODO: Write reduce function
                return values;
            },
            true
        );
    };

    /**
     * Simulates a CouchDB map
     *
     * @param array docs
     * @param function mapFunction
     */
    view.map = function(docs, mapFunction) {
        var result = [];

        _.each(docs, mapFunction.bind({
                emit: function(key, value) {
                    result.push({
                        "key": key,
                        "value": value
                    });
                }
            })
        );

        return result;
    };

    /**
     * Simulates a CouchDB reduce
     *
     * @param array result
     * @param function reduceFunction
     * @param bool group
     */
    view.reduce = function(mapResult, reduceFunction, group) {
        if (!group) {
            return [{
                "key": null,
                "value": reduceFunction(mapResult)
            }];
        }

        var keys = _.uniq(_.pluck(mapResult, "key"));

        return _.map(keys, function(key) {
            return {
                "key": key,
                "value": reduceFunction(
                    key,
                    _.pluck(_.where(mapResult, {"key": key}), "value"),
                    false
                )
            }
        });
    }

    /**
     * Call callback with a list of all recipes
     *
     * @param string target
     */
    view.findAll = function(callback) {
        hoodie.store.findAll().done(function (myDocs) {
            hoodie.global.findAll().done(function (globalDocs) {
                callback(
                    _.uniq(
                        _.union(myDocs, globalDocs),
                        false,
                        function (doc) {
                            return doc.id;
                        }
                    )
                );
            });
        });
    };

    // Exports
    global.Recipe = global.Recipe || {};
    global.Recipe.view = view;

})(this);
