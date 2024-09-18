const { Magic } = require ('../models');

const magicController = {
  async getAllMagics(req, res){
    try{
      const magics = await Magic.findAll();

      res.status(200).json(magics);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }
  },

  async getOneMagic(req, res){
    try{
      const magicId = req.params.id;
      const magicToGet = await Magic.findByPk(magicId);

      if (!magicToGet){
        return res.status(404).json({ message: `Magic with id ${magicId} not found.`});
      }

      res.status(200).json(magicToGet);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }   
  },

  async deleteOneMagic(req, res){
    try{
      const magicId = req.params.id;
      const magicToDelete = await Magic.findByPk(magicId);

      if (!magicToDelete){
        return res.status(404).json({ message: `Magic with id ${magicId} not found.`});
      }

      await magicToDelete.destroy();

      res.status(204).json();

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }   
  },

  async createOneMagic(req, res){
    try{
      
      const { label } = req.body;    

      const magicToCreate = {};

      if (label === undefined || label === ""){
        return res.status(400).json({ message: 'Label of the magic is mandatory'});
      }

      magicToCreate.label = label;

      const newMagic = await Magic.create(magicToCreate);

      res.status(201).json(newMagic);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }  

  },

  async updateOneMagic(req, res){
    try{
      const magicId = req.params.id;
      const magicToUpdate = await Magic.findByPk(magicId);

      if (!magicToUpdate){
        return res.status(404).json({ message: `Magic with id ${magicId} not found.`});
      }

      const { label } = req.body;    

      if (label !== undefined && label === ""){
        return res.status(400).json({ message: 'Label of the magic should not be an empty string'});
      }

      if (label){
        magicToUpdate.label = label;
      }

      await magicToUpdate.save();

      res.status(200).json(magicToUpdate);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }  
  }
};

module.exports = magicController;