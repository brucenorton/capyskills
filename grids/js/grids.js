console.log('js/grids.js loaded...');
console.log(window.location.pathname);
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
    let delayIndex = 0;
    areas.forEach((area)=>{
      //console.log(area);
      let section = document.createElement('section');
      section.innerHTML = `<h2>${area.code} ${area.descriptor}</h2>`;
      section.classList.add('area');
      section.id = area.code;
      section.style.animationDelay = `${delayIndex * 100}ms`;
      delayIndex++;
      //section.addEventListener('click', (event)=> displayCompetencies(area, area.competency));
      //section.addEventListener('click', (event)=> displayCompetencies(event));   
      section.addEventListener('click', (event)=> getTarget(event, 'area'));   
      main.appendChild(section);

    })
  }

  // abstract out click event to load, to get state & then 
    // load competencies, skills & levels as needed

  function getTarget(event, stateElement){
    //console.log(event.target.parentNode.id);
    state[stateElement] = event.target.parentNode.id;
    //console.log(stateElement);
    //figure out which state to load??
    refreshGrids(stateElement);
  }

  function refreshGrids(stateElement){
    console.log(state);
    if (stateElement === 'area'){
      displayCompetencies(state[stateElement]);
    } else if (stateElement === 'competency'){
      displaySkills(state[stateElement]);
    }else if (stateElement === 'skill'){
      displayLevels(state[stateElement]);
    }
  }



  //function displayCompetencies(area, competencies){
  function displayCompetencies(stateArea){
    //console.log(event.target.parentNode.id);
    main.innerHTML = '';
    let delayIndex = 0;
    //state.area = event.target.parentNode.id;
    let competencies = gridJSON.area.filter(area => area.code === state.area)[0].competency; 
    // console.log(state.area);
    //console.log(gridJSON.area.filter(area => area.code === state.area)); 
    //console.log(competencies);
    // //console.log(state.area);
    // //console.info(gridJSON.area.filter(area => area.code === state.area));
    addAreaHeader(gridJSON.area.filter(area => area.code === state.area));
    // //add main heading
    // //console.log(competencies[0].code.split('.')[0]);
    
    competencies.forEach((competency)=>{
      //console.log(competency);
      let article = document.createElement('article');
      article.innerHTML = `<h3>${competency.code} ${competency.descriptor}</h3>`;
      article.className= 'competency';
      article.classList.add(competency.code.split('.')[0]);
      article.style.animationDelay = `${delayIndex * 100}ms`;
      delayIndex++;
      article.id = competency.code;
      //article.addEventListener('click', ()=> displaySkills(competency, competency.skill));
      // article.addEventListener('click', (event)=> displaySkills(event));
      article.addEventListener('click', (event)=> getTarget(event, 'competency'));
      main.appendChild(article);
    })
  }

  function displaySkills(stateSkill){
    main.innerHTML = '';
    let delayIndex = 0;
    //add clicked competency code to state i.e. VA.1 Creating Design Projects
    //state.competency = event.target.parentNode.id;
    //console.log(state.competency);

    //filter skills i.e. NGE.2.1 Introduce presentation
    //console.log(gridJSON.area.filter(area => area.code === state.area)[0].competency.filter(competency => competency.code === state.competency)[0].skill);
    let skills = gridJSON.area.filter(area => area.code === state.area)[0].competency.filter(competency => competency.code === state.competency)[0].skill
    //add headers
      //filter areas i.e. HOS Habits of Success
      addAreaHeader(gridJSON.area.filter(area => area.code === state.area));
      //filter competencies i.e. HOS.2 Build Networks
      addCompetencyHeader(gridJSON.area.filter(area => area.code === state.area)[0].competency.filter(competency => competency.code === state.competency));

    skills.forEach((skill)=>{
      let article = document.createElement('article');
      article.innerHTML = `<h3>${skill.code} ${skill.descriptor}</h3>`;
      article.className= 'skill';
      article.classList.add(skill.code.split('.')[0]);
      // article.style.animationDelay = `${delayIndex * 100}ms`;
      // delayIndex++;
      article.id = skill.code;
      //article.addEventListener('click', (event)=> displayLevels(skill, skill.level));
      ///article.addEventListener('click', (event)=> displayLevels(event));
      article.addEventListener('click', (event)=> getTarget(event, 'skill'));  
      main.appendChild(article);
      
    })
     
  }
  //function displayLevels(skill, levels){
  function displayLevels(stateLevel){
    main.innerHTML = '';
    let delayIndex = 0;
    //state.skill = event.target.parentNode.id;
    //console.log(state.skill);
    let levels = gridJSON.area.filter(area => area.code === state.area)[0].competency.filter(competency => competency.code === state.competency)[0].skill.filter(skill => skill.code === state.skill)[0].level;
    //console.log(levels);
    /* something about not repeating this stuff 
    ?? create a function to reload stuff whenever we change a level? 
    ?? whenever state changes? */
    //add headers
      addAreaHeader(gridJSON.area.filter(area => area.code === state.area));
      addCompetencyHeader(gridJSON.area.filter(area => area.code === state.area)[0].competency.filter(competency => competency.code === state.competency));
      addSkillHeader(gridJSON.area.filter(area => area.code === state.area)[0].competency.filter(competency => competency.code === state.competency)[0].skill.filter(skill => skill.code === state.skill)[0]);
    
    //need to read key / value pairs since displaying keys
    levels.forEach((level)=>{
      //section.innerHTML = `<h3>level ${Object.keys(level)}</h3>`;
      //loop through object.keys and values
      for (const [key, value] of Object.entries(level)) {
        let section = document.createElement('section');
        //console.log(`${key}: ${value}`);
        section.innerHTML += `<h3>level ${key}</h3>`;
        section.className= 'level';
        section.classList.add(state.skill.split('.')[0]);
        // section.style.animationDelay = `${delayIndex * 100}ms`;
        // delayIndex++;
        section.id = `${state.skill}.${key}`;
        //add level descriptions, but then hide?? i.e. 
        let div = document.createElement('div');
        div.innerHTML = value;
        section.appendChild(div);

        section.addEventListener('click', (event)=> displayLevel(event, level, key));
        main.appendChild(section);
      }
    })
  }
  // ?? key not needed anymore
  function displayLevel(event, level, key){
    //add level text or just toggle open/closed?
    //console.log(level,key);
    //console.log(level[key]);
    event.target.parentNode.querySelector('div').classList.toggle('open');
    state.level = key;
    console.log(state);
  }

//abstract? repeats displayArea();
function addAreaHeader(area){
  //console.log('addAreaHeader', area);
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
  //add eventListener to reload competencies, removing skills and levels
  //or just use state everywhere and reload everything?
  //article.addEventListener('click', ()=> displayCompetencies(competency[0].code));
  //console.log(state.competency);
  main.appendChild(article);
  article.addEventListener('click', (event)=> refreshGrids('area'));
}

function addSkillHeader(skill){ 
 
  let article = document.createElement('article');
  article.innerHTML = `<h3>${skill.code} ${skill.descriptor}</h3>`;
  article.className= 'skill';
  article.classList.add(skill.code.split('.')[0]);
  article.id = skill.code;
  main.appendChild(article);
  article.addEventListener('click', (event)=> refreshGrids('competency'));
}
