const { Specialization } = require ('../models');

const specializationController = {
  async getAllSpecializations(req, res){
    try{
      const specializations = await Specialization.findAll();

      res.status(200).json(specializations);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }
  },

  async getOneSpecialization(req, res){
    try{
      const specializationId = req.params.id;
      const specializationToGet = await Specialization.findByPk(specializationId);

      if (!specializationToGet){
        return res.status(404).json({ message: `Specialization with id ${specializationId} not found.`});
      }

      res.status(200).json(specializationToGet);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }   
  },

  async deleteOneSpecialization(req, res){
    try{
      const specializationId = req.params.id;
      const specializationToDelete = await Specialization.findByPk(specializationId);

      if (!specializationToDelete){
        return res.status(404).json({ message: `Specialization with id ${specializationId} not found.`});
      }

      await specializationToDelete.destroy();

      res.status(204).json();

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }   
  },

  async createOneSpecialization(req, res){
    try{
      
      const { label, class_id } = req.body;    

      const specializationToCreate = {};

      if (label === undefined || label === ""){
        return res.status(400).json({ message: 'Label of the specialization is mandatory'});
      }

      specializationToCreate.label = label;

      let classIdInt = Number(class_id);

      if (isNaN(classIdInt)){
        return res.status(400).json({ message: 'class_id should be an integer'});
      }
      specializationToCreate.class_id = classIdInt;

      const newSpecialization = await Specialization.create(specializationToCreate);

      res.status(201).json(newSpecialization);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }  

  },

  async updateOneSpecialization(req, res){
    try{
      const specializationId = req.params.id;
      const specializationToUpdate = await Specialization.findByPk(specializationId);

      if (!specializationToUpdate){
        return res.status(404).json({ message: `Specialization with id ${specializationId} not found.`});
      }

      const { label, class_id } = req.body; 

      let classIdInt;
      if (class_id !== undefined){
        classIdInt = Number(class_id);

        if (isNaN(classIdInt)){
          return res.status(400).json({ message: 'class_id should be an integer'});
        }
      }   

      if (label !== undefined && label === ""){
        return res.status(400).json({ message: 'Label of the specialization should not be an empty string'});
      }

      if (label){
        specializationToUpdate.label = label;
      }

      if (class_id){
        specializationToUpdate.class_id = classIdInt;
      }  

      await specializationToUpdate.save();

      res.status(200).json(specializationToUpdate);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occured...'});
    }  
  }
};

module.exports = specializationController;