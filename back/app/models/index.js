const Class = require ('./Class');
const Magic = require ('./Magic');
const Race = require ('./Race');
const Specialization = require ('./Specialization');
const PrimarySkill = require ('./PrimarySkill');
const PrimaryStatistic = require ('./PrimaryStatistic');

// Magic <--> Class en One-to-Many
Magic.hasMany(Class, {
  as: 'classes',
  foreignKey: 'magic_id',
});

Class.belongsTo(Magic, {
  as: 'magic',
  foreignKey: 'magic_id',
});

// Class <--> Specialization en One-to-Many
Class.hasMany(Specialization, {
    as: 'specializations',
    foreignKey: 'class_id',
});
  
Specialization.belongsTo(Class, {
    as: 'class',
    foreignKey: 'class_id',
});

// Race <--> PrimarySkill en Many-to-Many
Race.belongsToMany(PrimarySkill, { 
  through: 'race_has_primary_skill',
  foreignKey: 'race_id',
  as: 'primary_skills',
  timestamps: false,
  createdAt: 'created_at',
});

PrimarySkill.belongsToMany(Race, { 
  through: 'race_has_primary_skill',
  foreignKey: 'primary_skill_id',
  as: 'races',
  timestamps: false,
  createdAt: 'created_at',
});

// Race <--> PrimaryStatistic en Many-to-Many
Race.belongsToMany(PrimaryStatistic, { 
  through: 'race_has_primary_statistic',
  foreignKey: 'race_id',
  as: 'primary_statistics',
  timestamps: false,
  createdAt: 'created_at',
});

PrimaryStatistic.belongsToMany(Race, { 
  through: 'race_has_primary_statistic',
  foreignKey: 'primary_statistic_id',
  as: 'races',
  timestamps: false,
  createdAt: 'created_at',
});

module.exports = {
  Class,
  Magic,
  Specialization,
  Race,
  PrimarySkill,
  PrimaryStatistic
}