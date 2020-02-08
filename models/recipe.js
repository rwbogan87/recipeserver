module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('recipe', {
        recipeName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipeCategory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipeIngredients: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipeInstructions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipePublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        chef: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
return Recipe;
}