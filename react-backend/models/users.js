module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        spotifyId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isAlphanumeric: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
    });

    return User;
}
