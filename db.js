const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;

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

const syncAndSeed = async () => {
	await conn.sync({ force: true });
	//place
	const [ work, school ] = await Promise.all([ Place.create({ name: 'work' }), Place.create({ name: 'school' }) ]);

	//person
	const [ kid, teen, adult ] = await Promise.all([
		Person.create({ name: 'kid', placeId: school.id }),
		Person.create({ name: 'teen', placeId: school.id }),
		Person.creat({ name: 'adult', placeId: work.id })
	]);

	//things
	const [ toy, notebook, car, laptop, lunchbox ] = await Promise.all([
		Thing.create({ name: 'toy', personId: kid.id }),
		Thing.create({ name: 'notebook', personId: teen.id }),
		Thing.create({ name: 'car', personId: adult.id }),
		Thing.create({ name: 'laptop', personId: teen.id }),
		Thing.create({ name: 'lunchbox', personId: kid.id })
	]);
};

syncAndSeed();

module.exports = {
	syncAndSeed,
	models: {
		Person,
		Place,
		Thing
	}
};
