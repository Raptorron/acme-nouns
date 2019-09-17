const Sequelize = require('sequelize');
const {STRING, UUID, UUIDV4} = Sequelize;

const conn = new Sequelize(process.envDATABASE_URL || 'postgres://localhost/acme_noun_db');



const Person = conn.define('person', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
});

const Place = conn.define('place', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
});

const Thing = conn.define('thing', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
});

Person.belongsTo(Place);
Place.hasMany(Person);
Place.belongsTo(Thing);
Thing.hasMany(Place);

const syncAndSeed = async ()=>{
  await conn.sync({force: true});



};

module.exports={
  syncAndSeed,
  models: {
    Person,
    Place,
    Thing
  }
}
