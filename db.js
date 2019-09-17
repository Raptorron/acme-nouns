const Sequelize = require('sequelize');
const {STRING, UUID, UUIDV4} = Sequelize;

const conn = new Sequelize('postgres://localhost/acme_noun_db');



const Person = conn.define('person', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: { notEmpty: true },
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
    validate: { notEmpty: true },
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
    validate: { notEmpty: true },
    unique: true
  }
});

Person.belongsTo(Place);
Place.hasMany(Person);

Thing.belongsTo(Person);
Person.hasMany(Thing);

const syncAndSeed = async ()=>{
  await conn.sync({force: true});
//place
const [ work, school ] = await Promise.all([

  Place.create({name: 'work'}),
  Place.create({name: 'school'})

])
//person

//things
const [ toy, notebook, car, laptop, lunchbox ] = await Promise.all()
  const things = [
    {name: 'toy'},
    {name: 'notebook'},
    {name: 'car'},
    {name: 'laptop'},
    {name: 'lunchbox'}
  ]





};

syncAndSeed();

module.exports={
  syncAndSeed,
  models: {
    Person,
    Place,
    Thing
  }
}
