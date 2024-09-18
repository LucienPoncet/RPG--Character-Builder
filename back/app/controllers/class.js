const { Class } = require ('../models');

const classController = {
  async getAllClasses(req, res){
    try{
      const classes = await Class.findAll({
        include: {
          association: 'specializations'
        },
      });

      res.status(200).json(classes);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }
  },

  async getOneClass(req, res){
    try{
      const classId = req.params.id;
      const classToGet = await Class.findByPk(classId);

      if (!classToGet){
        return res.status(404).json({ message: `Class with id ${classId} not found.`});
      }

      res.status(200).json(classToGet);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }   
  },

  async deleteOneClass(req, res){
    try{
      const classId = req.params.id;
      const classToDelete = await Class.findByPk(classId);

      if (!classToDelete){
        return res.status(404).json({ message: `Class with id ${classId} not found.`});
      }

      await classToDelete.destroy();

      res.status(204).json();

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }   
  },

  async createOneClass(req, res){
    try{
      
      const { label, magic_id } = req.body;    

      const classToCreate = {};

      if (label === undefined || label === ""){
        return res.status(400).json({ message: 'Label of the class is mandatory'});
      }

      classToCreate.label = label;


      let magicIdInt = Number(magic_id);

      if (magicIdInt){
        if (isNaN(magicIdInt)){
          return res.status(400).json({ message: 'magic_id should be an integer'});
        }   
        classToCreate.magic_id = magicIdInt;
      }

      const newClass = await Class.create(classToCreate);

      res.status(201).json(newClass);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }  

  },

  async updateOneClass(req, res){
    try{
      const classId = req.params.id;
      const classToUpdate = await Class.findByPk(classId);

      if (!classToUpdate){
        return res.status(404).json({ message: `Class with id ${classId} not found.`});
      }

      const { label, magic_id } = req.body;    

      if (label !== undefined && label === ""){
        return res.status(400).json({ message: 'Label of the class should not be an empty string'});
      }

      if (label){
        classToUpdate.label = label;
      }

      if (magic_id){
        classToUpdate.magic_id = magic_id;
      } else {
        classToUpdate.magic_id = null;
      }

      await classToUpdate.save();

      res.status(200).json(classToUpdate);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }  
  }
};

module.exports = classController;