"use strict";

/**
 * Recipe handling
 */
;(function($) {
    $.fn.recipe = function(hoodie) {
        var hoodie = hoodie;

        var addRecipe = function(e, data) {
            e.preventDefault();

            var recipe = Recipe.form.getRecipe(e.target);
            // @TODO: Store recipe

            return false;
        };

        var updateRecipe = function(e, data) {
            e.preventDefault();

            var recipe = Recipe.form.getRecipe(e.target);
            // @TODO: Update recipe

            return false;
        };

        var updateRecipeList = function() {
            // @TODO: Pass recipes to renderList function
        };

        var renderList = function(target, template, recipes) {
            $(target).empty();
            recipes.sort(function(a, b) {
                return ((a.title == b.title) ? 0 : ((a.title > b.title) ? 1 : -1));
            });

            Recipe.template.showTemplate(
                target,
                "templates/" + template,
                {"recipes": recipes},
                function () {
                    $(target).find("a").unbind("click");

                    $(target).find("a.mine").bind("click", showRecipe);
                    $(target).find("a.shared").bind("click", showSharedRecipe);

                    $(target).find("a.delete").bind("click", deleteRecipe);
                    $(target).find("a.edit").bind("click", editRecipe);

                    $(target).find("a.share").bind("click", shareRecipe);
                    $(target).find("a.unshare").bind("click", unshareRecipe);
                }
            );
        };

        var showRecipe = function(e, data) {
            e.preventDefault();

            var recipeId = $(e.currentTarget).data("recipe");
            // @TODO: Find and display recipe

            updateRecipeList();
            return false;
        }

        var showSharedRecipe = function(e, data) {
            e.preventDefault();

            var recipeId = $(e.currentTarget).data("recipe");
            // @TODO: Find and display recipe

            updateRecipeList();
            return false;
        }

        var deleteRecipe = function(e, data) {
            e.preventDefault();

            var recipeId = $(e.currentTarget).data("recipe");
            if (confirm("Do you really want to remove the recipe with ID " + recipeId + "?", "Delete recipe")) {
                // @TODO: Remove recipe
            }

            updateRecipeList();
            return false;
        }

        var editRecipe = function(e, data) {
            e.preventDefault();

            var recipeId = $(e.currentTarget).data("recipe");
            // @TODO: Find and edit recipe

            updateRecipeList();
            return false;
        }

        var shareRecipe = function(e, data) {
            e.preventDefault();

            var recipeId = $(e.currentTarget).data("recipe");
            // @TODO: Publish recipe

            updateRecipeList();
            return false;
        }

        var unshareRecipe = function(e, data) {
            e.preventDefault();

            var recipeId = $(e.currentTarget).data("recipe");
            // @TODO: Unpublish recipe

            updateRecipeList();
            return false;
        }

        return this.each(function() {
            $(this).find(".create button.ingredient").unbind("click");
            $(this).find(".create button.ingredient").bind("click", Recipe.form.addRow);

            $(this).find(".create form").unbind("submit");
            $(this).find(".create form").bind("submit", addRecipe);

            updateRecipeList();
            // @TODO: React on hoodie events
        });
    };
}(jQuery));
