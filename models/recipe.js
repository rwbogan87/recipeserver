module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('recipe', {
        recipeName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        recipeCategory: {
            type: DataTypes.STRING,
            allowNull: true
        },
        recipeIngredients: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        recipeInstructions: {
            type: DataTypes.STRING,
            allowNull: true
        },
        recipePublic: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        chef: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
return Recipe;
}