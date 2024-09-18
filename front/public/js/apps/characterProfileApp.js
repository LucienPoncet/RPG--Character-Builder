const api = require( '../apiEJS.js');

const app = {

  async profile(req, res){

    const character = await api.getCharacterById(req.params.id);

    if (character){
      res.render('characterprofile', {character});
    }

  },

  async init(req, res){

      const characters = await api.getCharacters();
    
      if (characters){
        res.render('characters', { characters });
      }
  }
};

module.exports = app ;