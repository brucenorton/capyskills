console.log('js/grids.js loaded...');
/* notes to self
- add to grids.json
- enable back button on headers
- fix .css layout 
*/
let state = {
  area: '',  //HOS
  competency: '', //HOS.1, HOS.2 etc
  skill: '', //HOS.1.1, HOS.1.2, HOS.2.1, HOS.2.2 etc
  level: '' //HOS.1.1.2, HOS.1.1.4, HOS.1.2.2, HOS.1.4. etc
}
let gridJSON = '';

const main = document.querySelector('main');
//** load grids.json **//

  async function loadGrids(){
    let url = 'js/grids.json';
    const response = await fetch(url);
    const grids = await response.json();
    gridJSON = grids;

    /* this works */
    //console.log(gridJSON.area.filter(area => area.code === "HOS"));
    //console.log(gridJSON.area.filter(area => area.code === "HOS")[0].competency.filter(competency => competency.code === "HOS.1"));
    //console.log(grids);
    //console.log(grids.area[0].competency[0].skill);
    //display areas
    displayAreas(grids.area);

  }

  loadGrids();

  function displayAreas(areas){
    main.innerHTML = '';
    areas.forEach((area)=>{
      //console.log(area);
      let section = document.createElement('section');
      section.innerHTML = `<h2>${area.code} ${area.descriptor}</h2>`;
      section.className= 'area';
      section.id = area.code;
      section.addEventListener('click', (event)=> displayCompetencies(area, area.competency));
      main.appendChild(section);

    })
  }

  function displayCompetencies(area, competencies){
    main.innerHTML = '';
    state.area = area.code;  
    //console.log(state.area);
    //console.info(gridJSON.area.filter(area => area.code === state.area));
    addAreaHeader(gridJSON.area.filter(area => area.code === state.area));
    //add main heading
    //console.log(competencies[0].code.split('.')[0]);
    
    competencies.forEach((competency)=>{
      //console.log(competency);
      let article = document.createElement('article');
      article.innerHTML = `<h3>${competency.code} ${competency.descriptor}</h3>`;
      article.className= 'competency';
      article.classList.add(competency.code.split('.')[0]);
      article.id = competency.code;
      article.addEventListener('click', ()=> displaySkills(competency, competency.skill));
      main.appendChild(article);
    })
  }

  function displaySkills(competency, skills){
    main.innerHTML = '';
    state.competency = competency.code;
    //console.log(state.competency);
    addAreaHeader(gridJSON.area.filter(area => area.code === state.area));
    //console.log(gridJSON.area.filter(competency => competency.code === state.competency));
    addCompetencyHeader(gridJSON.area.filter(area => area.code === state.area)[0].competency.filter(competency => competency.code === state.competency));
    
    //addAreaHeader(area);
    //console.log(skills);
    //addCompetencyHeader(skills[0].competency);
    skills.forEach((skill)=>{
      let article = document.createElement('article');
      article.innerHTML = `<h3>${skill.code} ${skill.descriptor}</h3>`;
      article.className= 'skill';
      article.classList.add(skill.code.split('.')[0]);
      article.id = skill.code;
      article.addEventListener('click', ()=> displayLevels(skill, skill.level));
      main.appendChild(article);
      
    })
  }

  function displayLevels(skill, levels){
    //console.log(skill.code);
    //console.log(levels[0][2]);
    main.innerHTML = '';
    state.skill = skill.code;
    //console.log(state);
    /* something about not repeating this stuff 
    ?? create a function to reload stuff whenever we change a level? 
    ?? whenever state changes? */
    addAreaHeader(gridJSON.area.filter(area => area.code === state.area));
    addCompetencyHeader(gridJSON.area.filter(area => area.code === state.area)[0].competency.filter(competency => competency.code === state.competency));
    addSkillHeader(skill);
    /* not sure how to to do this... redo .json?? */
    levels.forEach((level)=>{
      
      //section.innerHTML = `<h3>level ${Object.keys(level)}</h3>`;
      //loop through object.keys and values
      for (const [key, value] of Object.entries(level)) {
        let section = document.createElement('section');
        //console.log(`${key}: ${value}`);
        section.innerHTML += `<h3>level ${key}</h3>`;
        section.className= 'level';
        section.classList.add(skill.code.split('.')[0]);
        section.id = `${skill.code}.${key}`;
        //add level descriptions, but then hide??
        let div = document.createElement('div');
        div.innerHTML = skill.level[0][key];
        //console.log(skill.level[0][key]);
        section.appendChild(div);

        section.addEventListener('click', (event)=> displayLevel(event, level, `${key}`));
        main.appendChild(section);
      }
      
    })
  }

  function displayLevel(event, level, key){
    //add level text or just toggle open/closed?
    //console.log(level,key);\
    //console.log(level[key]);
    event.target.parentNode.querySelector('div').classList.toggle('open');
    state.level = level;

  }


//abstract? repeats displayArea();
function addAreaHeader(area){
  let section = document.createElement('section');
  section.innerHTML = `<h2>${area[0].code} ${area[0].descriptor}</h2>`;
  section.className= 'area';
  section.id = area[0].code;
  section.addEventListener('click', ()=> loadGrids());
  main.appendChild(section);
}

// ai generated
function addCompetencyHeader(competency){
  let article = document.createElement('article');
  article.innerHTML = `<h3>${competency[0].code} ${competency[0].descriptor}</h3>`;
  article.className= 'competency';
  article.classList.add(competency[0].code.split('.')[0]);
  article.id = competency[0].code;
  main.appendChild(article);
}

function addSkillHeader(skill){ 
  let article = document.createElement('article');
  article.innerHTML = `<h3>${skill.code} ${skill.descriptor}</h3>`;
  article.className= 'skill';
  article.classList.add(skill.code.split('.')[0]);
  article.id = skill.code;
  main.appendChild(article);
}

