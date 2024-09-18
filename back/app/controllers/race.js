const { Race } = require ('../models');

const raceController = {
    async getAllRaces(req, res){
      try{
        const races = await Race.findAll({
          include: [{
            association: 'primary_skills'
          },{
            association: 'primary_statistics',
          }],
        });
  
        res.status(200).json(races);
  
      }catch (error){
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occured...'});
      }
    },
  
    async getOneRace(req, res){
      try{
        const raceId = req.params.id;
        const raceToGet = await Race.findByPk(raceId);
  
        if (!raceToGet){
          return res.status(404).json({ message: `Race with id ${raceId} not found.`});
        }
  
        res.status(200).json(raceToGet);
  
      }catch (error){
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occured...'});
      }   
    },
  
    async deleteOneRace(req, res){
      try{
        const raceId = req.params.id;
        const raceToDelete = await Race.findByPk(raceId);
  
        if (!raceToDelete){
          return res.status(404).json({ message: `Race with id ${raceId} not found.`});
        }
  
        await raceToDelete.destroy();
  
        res.status(204).json();
  
      }catch (error){
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occured...'});
      }   
    },
  
    async createOneRace(req, res){
      try{
        
        const { label, skill, primary_skill_id, primary_statistic_id } = req.body;    
  
        const raceToCreate = {};
  
        if (label === undefined || label === ""){
          return res.status(400).json({ message: 'Label of the race is mandatory'});
        }
  
        raceToCreate.label = label;
  
        if (skill === undefined || skill === ""){
            return res.status(400).json({ message: 'Skill of the race is mandatory'});
          }
    
        raceToCreate.skill = skill;

        let pskIdInt = Number(primary_skill_id);

        if (pskIdInt){
          if (isNaN(pskIdInt)){
            return res.status(400).json({ message: 'primary_skill_id should be an integer'});
          }   
          raceToCreate.primary_skill_id = pskIdInt;
        }

        let pstIdInt = Number(primary_statistic_id);

        if (pstIdInt){
          if (isNaN(pstIdInt)){
            return res.status(400).json({ message: 'primary_statistic_id should be an integer'});
          }   
          raceToCreate.primary_statistic_id = pstIdInt;
        }
  
        const newRace = await Race.create(raceToCreate);
  
        res.status(201).json(newRace);
  
      }catch (error){
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occured...'});
      }  
  
    },
  
    async updateOneRace(req, res){
      try{
        const raceId = req.params.id;
        const raceToUpdate = await Race.findByPk(raceId);
  
        if (!raceToUpdate){
          return res.status(404).json({ message: `Race with id ${raceId} not found.`});
        }
  
        const { label, skill } = req.body;    
  
        if (label !== undefined && label === ""){
          return res.status(400).json({ message: 'Label of the race should not be an empty string'});
        }
  
        if (label){
            raceToUpdate.label = label;
        }

        if (skill !== undefined && skill === ""){
            return res.status(400).json({ message: 'Skill of the race should not be an empty string'});
          }
  
        if (skill){
            raceToUpdate.skill = skill;
        }
  
        await raceToUpdate.save();
  
        res.status(200).json(raceToUpdate);
  
      }catch (error){
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occured...'});
      }  
    }
  };

module.exports = raceController;