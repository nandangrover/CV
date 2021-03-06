class themeElon_1 {
    constructor(config) {
      this.config = config;
      this.elemObj = {};
      document.addEventListener("DOMContentLoaded", () => {
        this.loadSequence('addEvents');
      }, this);
    }
  
    loadSequence(loadFunction) {
      switch (loadFunction) {
        case 'addEvents':
          window.parent.document.getElementById("print").removeEventListener('click', () => this.loadSequence('print'));
          window.parent.document.getElementById("print").addEventListener('click', () => this.loadSequence('print'));
          this.loadSequence('createStructure');
        break;
        case 'createStructure':
          this.createStructure();
        break;
        case 'print':
          window.print();
        break;
      }
    }
  
  
    createStructure() {
      this.topNavigation();
  
      this.resumeContent();
    }
  
    topNavigation() {
      this.createElement({ className: 'topNavContainer', id: 'topNavContainer', appendTo: 'main' });
  
      this.createElement({ className: 'leftPartition', id: 'leftPartition', appendTo: 'topNavContainer' });
      // left-block
      this.createElement({ className: 'leftBlock', id: 'leftBlock', appendTo: 'leftPartition' });
      // text-bloc
      this.createElement({ className: 'textBlock', id: 'textBlock', appendTo: 'leftPartition' });
      // name
      this.createElement({ className: 'name', id: 'name', appendTo: 'textBlock', html: this.config.elements.topNav.name });
      // designation
      this.createElement({ className: 'designation', id: 'designation', appendTo: 'textBlock', html: this.config.elements.topNav.designation });
      // bio
      this.createElement({ className: 'bio', id: 'bio', appendTo: 'textBlock', html: this.config.elements.topNav.bio });
  
      this.createElement({ className: 'rightPartition', id: 'rightPartition', appendTo: 'topNavContainer' });
  
      //icon holder
      this.createElement({ className: 'iconsHolder', id: 'iconsHolder', appendTo: 'rightPartition' });
  
  
      // message Icon
      this.createElement({ className: 'iconHolder', id: 'iconHolder1', appendTo: 'iconsHolder' });
      this.createElement({ className: 'iconText', id: 'email', appendTo: 'iconHolder1', html: this.config.elements.topNav.email });
      this.createElement({ className: 'icon', id: 'icon1', appendTo: 'iconHolder1' });
      this.createElement({ className: 'fas fa-envelope icon', id: 'email', appendTo: 'icon1' });
  
      // mobile Icon
      this.createElement({ className: 'iconHolder', id: 'iconHolder2', appendTo: 'iconsHolder' });
      this.createElement({ className: 'iconText', id: 'number', appendTo: 'iconHolder2', html: this.config.elements.topNav.number });
      this.createElement({ className: 'icon', id: 'icon2', appendTo: 'iconHolder2' });
      this.createElement({ className: 'fas fa-mobile-alt icon', id: 'number', appendTo: 'icon2' });
  
      // location Icon
      this.createElement({ className: 'iconHolder', id: 'iconHolder3', appendTo: 'iconsHolder' });
      this.createElement({ className: 'iconText', id: 'location', appendTo: 'iconHolder3', html: this.config.elements.topNav.location });
      this.createElement({ className: 'icon', id: 'icon3', appendTo: 'iconHolder3' });
      this.createElement({ className: 'fas fa-map-marker-alt icon', id: 'location', appendTo: 'icon3' });
      
      if (this.config.elements.topNav.github || this.config.elements.topNav.linkedin) {
      // gitHub Icon
      this.createElement({ className: 'iconHolder', id: 'iconHolder4', appendTo: 'iconsHolder' });
      this.createElement({ className: 'iconText', id: 'github', appendTo: 'iconHolder4', html: 'gitHub', type: 'a', attr: [{ key: 'href', value: this.config.elements.topNav.github }, , { key: 'target', value: '_blank' }] });
      this.createElement({ className: 'icon', id: 'icon4', appendTo: 'iconHolder4' });
      this.createElement({ className: 'fab fa-github icon', id: 'github', appendTo: 'icon4' });
  
      // linkedIn Iconfab
      this.createElement({ className: 'iconHolder', id: 'iconHolder5', appendTo: 'iconsHolder' });
      this.createElement({ className: 'iconText', id: 'linkedin', appendTo: 'iconHolder5', html: 'linkedIn', type: 'a', attr: [{ key: 'href', value: this.config.elements.topNav.linkedin }, { key: 'target', value: '_blank' }] });
      this.createElement({ className: 'icon', id: 'icon5', appendTo: 'iconHolder5' });
      this.createElement({ className: 'fab fa-linkedin icon', id: 'linkedin', appendTo: 'icon5' });
      } else {
          Array.from(document.getElementsByClassName("iconHolder")).forEach((elem, idx) => {
          document.getElementById(`iconHolder${idx+1}`).style.paddingBottom = "25px";
        })
      }
  
    }
  
    resumeContent() {
      this.createElement({ className: 'resumeContent', id: 'resumeContent', appendTo: 'main' });
  
      this.createElement({ className: 'leftPartitionContent', id: 'leftPartitionContent', appendTo: 'resumeContent' });
  
      this.createElement({ className: 'rightPartitionContent', id: 'rightPartitionContent', appendTo: 'resumeContent' });
  
      this.creatWorkExperienceBlock(this.config.elements.resumeContent[0].workExperience);
  
      this.createPersonalProjectsBlock(this.config.elements.resumeContent[1].personalProjects);
  
      this.creatEducationBlock(this.config.elements.resumeContent[2].education);
  
      this.createSkillsBlock(this.config.elements.resumeContent[3].skills);
  
      this.createInterestsBlock(this.config.elements.resumeContent[4].interests);
    }
  
    creatWorkExperienceBlock(path) {
      // Work Experience
      this.createElement({ className: 'workExperience', id: 'workExperience', appendTo: 'leftPartitionContent' });
  
      this.createElement({ className: 'header', id: 'workExperienceHeader', appendTo: 'workExperience', html: this.config.elements.resumeContent[0].header });
  
      path.forEach((element, idx) => {
        this.createElement({ className: 'blockHolder', id: `blockHolder_${idx}`, appendTo: 'workExperience' });
        // left-block
        this.createElement({ className: 'leftBlock contentColor', id: 'leftBlock', appendTo: `blockHolder_${idx}` });
        // text-bloc
        this.createElement({ className: 'textBlock', id: `textBlock_${idx}`, appendTo: `blockHolder_${idx}` });
  
        this.createElement({ className: 'designation contentDesig', id: `designation_${idx}`, appendTo: `textBlock_${idx}`, html: path[idx]['designation'] });
  
        this.createElement({ className: 'companyName', id: `companyName_${idx}`, appendTo: `textBlock_${idx}`, html: path[idx]['companyName'] });
  
        this.createElement({ className: 'dateStarted', id: `dateStarted_${idx}`, appendTo: `textBlock_${idx}`, html: path[idx]['dateStarted'] });
  
        this.createElement({ className: 'locationCompany', id: `locationCompany_${idx}`, appendTo: `textBlock_${idx}`, html: path[idx]['location'] });
  
        if (path[idx].description) {
          // description
          this.createElement({ className: 'description', id: `description_${idx}`, appendTo: `textBlock_${idx}`, html: '', type: 'ul' });
  
          path[idx].description.forEach((listItem, _idx) => {
            this.createElement({ className: 'listItems', id: `listItems_${_idx}${idx}`, appendTo: `description_${idx}`, html: listItem, type: 'li' });
          })
        }
      });
    }
  
    creatEducationBlock(path) {
      // Education
      this.createElement({ className: 'education', id: 'education', appendTo: 'rightPartitionContent' });
  
      this.createElement({ className: 'header', id: 'educationHeader', appendTo: 'education', html: this.config.elements.resumeContent[2].header });
  
      path.forEach((element, idx) => {
        this.createElement({ className: 'blockHolder', id: `blockHolder_1${idx}`, appendTo: 'education' });
        // left-block
        this.createElement({ className: 'leftBlock contentColor', id: 'leftBlock', appendTo: `blockHolder_1${idx}` });
        // text-bloc
        this.createElement({ className: 'textBlock', id: `textBlock_1${idx}`, appendTo: `blockHolder_1${idx}` });
  
        this.createElement({ className: 'designation contentDesig', id: `degree_${idx}`, appendTo: `textBlock_1${idx}`, html: path[idx]['degree'] });
  
        this.createElement({ className: 'companyName', id: `collegeName_${idx}`, appendTo: `textBlock_1${idx}`, html: path[idx]['collegeName'] });
  
        this.createElement({ className: 'dateStarted', id: `dateStarted_1${idx}`, appendTo: `textBlock_1${idx}`, html: path[idx]['dateStarted'] });
  
        this.createElement({ className: 'locationCompany', id: `locationCompany_1${idx}`, appendTo: `textBlock_1${idx}`, html: path[idx]['location'] });
  
        if (path[idx].description) {
          // description
          this.createElement({ className: 'description', id: `description_1${idx}`, appendTo: `textBlock_1${idx}`, html: '', type: 'ul' });
  
          path[idx].description.forEach((listItem, _idx) => {
            this.createElement({ className: 'listItems', id: `listItems_1${_idx}${idx}`, appendTo: `description_1${idx}`, html: listItem, type: 'li' });
          })
        }
      });
    }
  
    createSkillsBlock(path) {
      // Skills
      this.createElement({ className: 'skillsContainer', id: 'skillsContainer', appendTo: 'rightPartitionContent' });
  
      this.createElement({ className: 'header', id: 'skillsHeader', appendTo: 'skillsContainer', html: this.config.elements.resumeContent[3].header });
  
      this.createElement({ className: 'textBlock', id: `skills_block`, appendTo: `skillsContainer` });
  
      path.forEach((skill, idx) => {
        this.createElement({ className: 'skills', id: `skill_${idx}`, appendTo: 'skills_block', html: skill });
      });
    }
  
    createPersonalProjectsBlock(path) {
      // Skills
      this.createElement({ className: 'projectsContainer', id: 'projectsContainer', appendTo: 'leftPartitionContent' });
  
      this.createElement({ className: 'header', id: 'projects_header', appendTo: 'projectsContainer', html: this.config.elements.resumeContent[1].header });
  
      path.forEach((project, idx) => {
        this.createElement({ className: 'blockHolder', id: `blockHolder_personal_${idx}`, appendTo: 'projectsContainer' });
  
        this.createElement({ className: 'leftBlock contentColor', id: 'leftBlock', appendTo: `blockHolder_personal_${idx}` });
        // text-bloc
        this.createElement({ className: 'textBlock', id: `textBlock_personal_1${idx}`, appendTo: `blockHolder_personal_${idx}` });
  
        this.createElement({ className: 'designation contentDesig', id: `name_${idx}`, appendTo: `textBlock_personal_1${idx}`, html: path[idx]['name'] });
  
        this.createElement({ className: 'description personalProject', id: `description_${idx}`, appendTo: `textBlock_personal_1${idx}`, html: path[idx]['description'] });
  
        this.createElement({ className: 'iconText', id: `projectLink_${idx}`, appendTo: `textBlock_personal_1${idx}`, html: 'Project Link', type: 'a', attr: [{ key: 'href', value: path[idx]['link'] }, { key: 'target', value: '_blank' }] });
      });
  
    }
  
    createInterestsBlock(path) {
      // Interests
      this.createElement({ className: 'interestsContainer', id: 'interestsContainer', appendTo: 'rightPartitionContent' });
  
      this.createElement({ className: 'header', id: 'interests_header', appendTo: 'interestsContainer', html: this.config.elements.resumeContent[4].header });
  
      this.createElement({ className: 'textBlock', id: `interest_block`, appendTo: `interestsContainer` });
  
      path.forEach((interest, idx) => {
        this.createElement({ className: 'skills interest', id: `interes_${idx}`, appendTo: 'interest_block', html: interest });
      });
    }
  
    createElement({ className, id, appendTo, html = '', type = 'div', attr = [] }) {
      const div = document.createElement(type);
      div.setAttribute('class', className);
      div.setAttribute('id', id);
      if (attr) {
        attr.forEach(({ key, value }) => div.setAttribute(key, value));
      }
      document.getElementById(appendTo).appendChild(div);
      div.innerHTML = html;
      return div;
    }
  }

  new themeElon_1(window.parent.themeElon_1);