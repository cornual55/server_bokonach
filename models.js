const sequelize = require ('./db')
const {DataTypes} = require ('sequelize')


const ADMIN = sequelize.define(modelName= 'admin', attributes={
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    LogAdmin: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}, 
})

const Service = sequelize.define(modelName= 'service', attributes={
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false}, 
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}, 
    
})

const NEWS = sequelize.define(modelName= 'news', attributes={
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false}, 
    img: {type: DataTypes.STRING, allowNull: false}, 

})

const PHOTO = sequelize.define(modelName= 'photo', attributes={
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: false}, 
})

const Zayavki = sequelize.define(modelName= 'zayavki', attributes={
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    FIO: {type: DataTypes.STRING, allowNull: false},
    Tel: {type: DataTypes.INTEGER, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false}, 
    id_service: {type: DataTypes.INTEGER},
     
})

Service.hasMany(PHOTO)
PHOTO.belongsTo(Service)

NEWS.hasMany(PHOTO)
PHOTO.belongsTo(NEWS)

module.exports = {
    ADMIN,
    Service,
    NEWS,
    PHOTO,
    Zayavki,
}