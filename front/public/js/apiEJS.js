const config = {
    baseUrl: "http://localhost:3000/",
};

function log(message){
  console.log(message);
};


const api = {

  async getClasses(token){
    try{

      const classesResponse = await fetch(`${config.baseUrl}classes`, {
        headers: {
          "Authorization": token
        }
      });

      if (!classesResponse.ok){
        alert("Une erreur s'est produite. Merci de revenir plus tard...");
        return;
      }

      log('Tout va bien');

      const classesData = await classesResponse.json();
      return classesData;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async createClass(classData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}classes`, {
        method: 'POST',
        body: JSON.stringify(classData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdClass = responseBody;

      return createdClass;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async updateClass(classData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}classes/${classData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(classData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const modifiedClass = responseBody;
      return modifiedClass;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async deleteClass(classId, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}classes/${classId}`, {
        method:'DELETE',
        headers: {
          "Authorization": token
        }
      });

      if (!apiResponse.ok){
        const responseBody = await apiResponse.json();
        alert(responseBody.message);
        return;
      }

      return true;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async getSpecializations(token){
    try{

      const specializationsResponse = await fetch(`${config.baseUrl}specializations`, {
        headers: {
          "Authorization": token
        }
      });

      if (!specializationsResponse.ok){
        alert("Une erreur s'est produite. Merci de revenir plus tard...");
        return;
      }

      log('Tout va bien');

      const specializationsData = await specializationsResponse.json();
      return specializationsData;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async createSpecialization(specializationData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}specializations`, {
        method: 'POST',
        body: JSON.stringify(specializationData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdSpecialization = responseBody;

      return createdSpecialization;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async updateSpecialization(specializationData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}specializations/${specializationData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(specializationData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const modifiedSpecialization = responseBody;
      return modifiedSpecialization;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async deleteSpecialization(specializationId, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}specializations/${specializationId}`, {
        method:'DELETE',
        headers: {
          "Authorization": token
        }
      });

      if (!apiResponse.ok){
        const responseBody = await apiResponse.json();
        alert(responseBody.message);
        return;
      }

      return true;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },


  async getMagics(token){
    try{

      const magicsResponse = await fetch(`${config.baseUrl}magics`, {
        headers: {
          "Authorization": token
        }
      });

      if (!magicsResponse.ok){
        alert("Une erreur s'est produite. Merci de revenir plus tard...");
        return;
      }

      log('Tout va bien');

      const magicsData = await magicsResponse.json();
      return magicsData;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async createMagic(magicData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}magics`, {
        method: 'POST',
        body: JSON.stringify(magicData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdMagic = responseBody;

      return createdMagic;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async updateMagic(magicData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}magics/${magicData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(magicData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const modifiedMagic = responseBody;
      return modifiedMagic;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async deleteMagic(magicId, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}magics/${magicId}`, {
        method:'DELETE',
        headers: {
          "Authorization": token
        }
      });

      if (!apiResponse.ok){
        const responseBody = await apiResponse.json();
        alert(responseBody.message);
        return;
      }

      return true;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },


  async getRaces(token){
    try{

      const racesResponse = await fetch(`${config.baseUrl}races`, {
        headers: {
          "Authorization": token
        }
      });

      if (!racesResponse.ok){
        alert("Une erreur s'est produite. Merci de revenir plus tard...");
        return;
      }

      log('Tout va bien');

      const racesData = await racesResponse.json();
      return racesData;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async createRace(raceData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}races`, {
        method: 'POST',
        body: JSON.stringify(raceData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdRace = responseBody;

      return createdRace;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async updateRace(raceData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}races/${raceData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(raceData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const modifiedRace = responseBody;
      return modifiedRace;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async deleteRace(raceId, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}races/${raceId}`, {
        method:'DELETE',
        headers: {
          "Authorization": token
        }
      });

      if (!apiResponse.ok){
        const responseBody = await apiResponse.json();
        alert(responseBody.message);
        return;
      }

      return true;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },


  async getPrimarySkills(token){
    try{

      const PrimarySkillsResponse = await fetch(`${config.baseUrl}primary_skills`, {
        headers: {
          "Authorization": token
        }
      });

      if (!PrimarySkillsResponse.ok){
        alert("Une erreur s'est produite. Merci de revenir plus tard...");
        return;
      }

      log('Tout va bien');

      const PrimarySkillsData = await PrimarySkillsResponse.json();
      return PrimarySkillsData;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async createPrimarySkill(PrimarySkillData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}primary_skills`, {
        method: 'POST',
        body: JSON.stringify(PrimarySkillData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdPrimarySkill = responseBody;

      return createdPrimarySkill;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async updatePrimarySkill(PrimarySkillData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}primary_skills/${Number(PrimarySkillData.id)}`, {
        method: 'PATCH',
        body: JSON.stringify(PrimarySkillData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const modifiedPrimarySkill = responseBody;
      return modifiedPrimarySkill;
    }catch(error){
      console.log(error)
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async deletePrimarySkill(PrimarySkillId, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}primary_skills/${PrimarySkillId}`, {
        method:'DELETE',
        headers: {
          "Authorization": token
        }
      });

      if (!apiResponse.ok){
        const responseBody = await apiResponse.json();
        alert(responseBody.message);
        return;
      }

      return true;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },


  async getPrimaryStatistics(token){
    try{

      const PrimaryStatisticsResponse = await fetch(`${config.baseUrl}primary_statistics`, {
        headers: {
          "Authorization": token
        }
      });

      if (!PrimaryStatisticsResponse.ok){
        alert("Une erreur s'est produite. Merci de revenir plus tard...");
        return;
      }

      log('Tout va bien');

      const PrimaryStatisticsData = await PrimaryStatisticsResponse.json();
      return PrimaryStatisticsData;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },
  
  async createPrimaryStatistic(PrimaryStatisticData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}primary_statistics`, {
        method: 'POST',
        body: JSON.stringify(PrimaryStatisticData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdPrimaryStatistic = responseBody;

      return createdPrimaryStatistic;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async updatePrimaryStatistic(PrimaryStatisticData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}primary_statistics/${Number(PrimaryStatisticData.id)}`, {
        method: 'PATCH',
        body: JSON.stringify(PrimaryStatisticData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const modifiedPrimaryStatistic = responseBody;
      return modifiedPrimaryStatistic;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async deletePrimaryStatistic(PrimaryStatisticId, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}primary_statistics/${PrimaryStatisticId}`, {
        method:'DELETE',
        headers: {
          "Authorization": token
        }
      });

      if (!apiResponse.ok){
        const responseBody = await apiResponse.json();
        alert(responseBody.message);
        return;
      }

      return true;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },


  async getCharacters(){
    try{

      const CharactersResponse = await fetch(`${config.baseUrl}characters/all`, {
        
      });

      if (!CharactersResponse.ok){
        alert("Une erreur s'est produite. Merci de revenir plus tard...");
        return;
      }

      log('Tout va bien');

      const CharactersData = await CharactersResponse.json();
      return CharactersData;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async getCharacterById(characterId){
    try{

      const CharactersResponse = await fetch(`${config.baseUrl}characters/${characterId}`, {
      });

      if (!CharactersResponse.ok){
        alert("Une erreur s'est produite. Merci de revenir plus tard...");
        return;
      }

      log('Tout va bien');

      const CharactersData = await CharactersResponse.json();
      return CharactersData;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },
  
  async createCharacter(CharacterData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}characters`, {
        method: 'POST',
        body: JSON.stringify(CharacterData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdCharacter = responseBody;

      return createdCharacter;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async updateCharacter(CharacterData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}characters/${Number(CharacterData.id)}`, {
        method: 'PATCH',
        body: JSON.stringify(CharacterData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const modifiedCharacter = responseBody;
      return modifiedCharacter;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async deleteCharacter(CharacterId, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}characters/${CharacterId}`, {
        method:'DELETE',
        headers: {
          "Authorization": token
        }
      });

      if (!apiResponse.ok){
        const responseBody = await apiResponse.json();
        alert(responseBody.message);
        return;
      }

      return true;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async signupUser(data){
    try {
      const apiResponse = await fetch(`${config.baseUrl}user/signup`, {
        method:"POST",
        body:JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdUser = responseBody;

      return createdUser;
      
    } catch(error) {
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async signinUser(data){
    try {
      const apiResponse = await fetch(`${config.baseUrl}user/signin`, {
        method:"POST",
        body:JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const loggedUser = responseBody;

      return loggedUser;
      
    } catch(error) {
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async getUser(token){
    try {
      const apiResponse = await fetch(`${config.baseUrl}user`, {
        headers: {
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdToken = responseBody;

      return createdToken;
      
    } catch(error) {
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async linkRacePSK(raceData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}primary_skills/races`, {
        method: 'POST',
        body: JSON.stringify(raceData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdLink = responseBody;

      return createdLink;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async linkRacePST(raceData, token){
    try{
      const apiResponse = await fetch(`${config.baseUrl}primary_statistics/races`, {
        method: 'POST',
        body: JSON.stringify(raceData),
        headers: {
          'Content-type': 'application/json',
          "Authorization": token
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdLink = responseBody;

      return createdLink;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

};

module.exports = api;