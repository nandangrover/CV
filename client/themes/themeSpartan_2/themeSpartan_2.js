class themeSpartan_2 {
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
          this.print();
        break;
      }
    }
  
  
    createStructure() {
      const sheet = document.getElementById("theme-style");
      sheet.disabled = true;
      sheet.parentNode.removeChild(sheet);
      this.addCss(`assets/css/orbit-${this.config['Style Number'] ?? 1}.css`)

      const name = document.getElementsByClassName('name')[0];
      name.innerHTML = this.config.name;

      const profileImg = document.getElementsByClassName('profile')[0];
      profileImg.setAttribute('src', this.config.profileImage);

      const designation = document.getElementsByClassName('tagline')[0];
      designation.innerHTML = this.config.designation;

      const phone = document.getElementsByClassName('phone')[0].getElementsByTagName('a')[0];
      phone.setAttribute('href', `tel:${this.config.phone}`)
      phone.innerHTML = this.config.phone;

      const email = document.getElementsByClassName('email')[0].getElementsByTagName('a')[0];
      email.setAttribute('href', `mailto:${this.config.email}`)
      email.innerHTML = this.config.email;

      const website = document.getElementsByClassName('website')[0]
      if (this.config.websiteLink) {
        const link = website.getElementsByTagName('a')[0];
        link.innerHTML = this.config.websiteText;
        link.setAttribute('href', this.config.websiteLink)
      } else {
        website.remove();
      }

      const education = document.getElementsByClassName('education-container')[0];
      const eduTitle = education.getElementsByTagName('h2')[0];
      eduTitle.textContent = this.config.educationTitle;
      this.config.education.forEach((edu, index) => {
        this.createElement({ className: 'item', id: `eduItem-${index}`, type: 'div', appendTo: 'education-container' });
        this.createElement({ className: 'degree', html: edu.degree, type: 'h4', appendTo: `eduItem-${index}` });
        this.createElement({ className: 'meta', html: edu.meta, type: 'h5', appendTo: `eduItem-${index}` });
        this.createElement({ className: 'time', html: edu.time, appendTo: `eduItem-${index}` });
      });
     
      const languages = document.getElementsByClassName('languages-container')[0];
      const langTitle = languages.getElementsByTagName('h2')[0];
      langTitle.innerHTML = this.config.languageTitle;
      Object.keys(this.config.languages).forEach((key, index) => {
        this.createElement({ id:`langList-${index}`, html: key, type: 'li', appendTo: 'lang-ul' });
        this.createElement({ className: 'lang-desc', html: ` (${this.config.languages[key]})`, type: 'span', appendTo: `langList-${index}` });
      });

      const interest = document.getElementsByClassName('interests-container')[0];
      const interestTitle = interest.getElementsByTagName('h2')[0];
      interestTitle.innerHTML = this.config.interestTitle;
      this.config.interests.forEach((key, index) => {
        this.createElement({ html: key, type: 'li', appendTo: 'interest-ul' });
      });

      const summary = document.getElementsByClassName('summary-section')[0];
      const summaryTitle = summary.getElementsByTagName('h2')[0];
      summaryTitle.innerHTML = this.config.introTitle;
      const summaryText = summary.getElementsByTagName('div')[0];
      summaryText.innerHTML = `<p>${this.config.careerProfile}</p>`;

      const experience = document.getElementsByClassName('experiences-section')[0];
      const experienceTitle = experience.getElementsByTagName('h2')[0];
      experienceTitle.innerHTML = this.config.experienceTitle;
      this.config.experiences.forEach((experience, index) => {
        this.createElement({ className: 'item', id: `expitem-${index}`, type: 'div', appendTo: 'experiences-section' });
        this.createElement({ className: 'meta', id: `expmeta-${index}`, type: 'div', appendTo: `expitem-${index}` });
        this.createElement({ className: 'upper-row', id: `upperRow-${index}`, type: 'div', appendTo: `expmeta-${index}` });
        this.createElement({ className: 'job-title', type: 'h3', html: experience.designation, appendTo: `upperRow-${index}` });
        this.createElement({ className: 'time', type: 'div', html: experience.duration, appendTo: `upperRow-${index}` });
        this.createElement({ className: 'company', type: 'div', html: experience['name&location'], appendTo: `expmeta-${index}` });
        this.createElement({ className: 'details', type: 'div', html: experience.description, appendTo: `expitem-${index}` });
      });


      const projects = document.getElementsByClassName('projects-section')[0];
      const projectTitle = projects.getElementsByTagName('h2')[0];
      projectTitle.innerHTML = this.config.projectTitle;
      const projectIntro = projects.getElementsByClassName('intro')[0];
      projectIntro.innerHTML = this.config.projectsIntro;
      this.config.projects.forEach((project, index) => {
        this.createElement({ className: 'item', id: `projItem-${index}`, type: 'div', appendTo: 'projects-section' });
        this.createElement({ className: 'project-title', id: `projTitle-${index}`, type: 'span', appendTo: `projItem-${index}` });
        this.createElement({ type: 'a', appendTo: `projTitle-${index}`, attr: [{ key: 'href', value: project.link }, { key: 'target', value: '_blank' }], html: project.title });
        this.createElement({ className: 'project-tagline',html: ` - ${project.detail}`, type: 'span', appendTo: `projItem-${index}` });
      });

      const skills = document.getElementsByClassName('skills-section')[0];
      const skillTitle = skills.getElementsByTagName('h2')[0];
      skillTitle.innerHTML = this.config.skillsTitle;
      Object.keys(this.config.skills).forEach((skill, index) => {
        this.createElement({ className: 'item', id: `skillItem-${index}`, type: 'div', appendTo: 'skillset' });
        this.createElement({ className: 'level-title', html: skill, type: 'h3', appendTo: `skillItem-${index}` });
        this.createElement({ className: 'progress level-bar', id: `progressBar-${index}`, appendTo: `skillItem-${index}` });

        this.createElement({ className: 'progress-bar theme-progress-bar', type: 'div', appendTo: `progressBar-${index}`, attr: [{ key: 'role', value: 'progressbar' }, { key: 'style', value: `width: ${this.config.skills[skill]}%` }, { key: 'aria-valuenow', value: this.config.skills[skill] }, { key: 'aria-valuemin', value: '0' }, { key: 'aria-valuemax', value: '100' }] });
      });
    }

    addCss(fileName) {
      const head = document.head;
      const link = document.createElement("link");
    
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = fileName;
    
      head.appendChild(link);
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

    print() {
      const printContents = document.getElementById('wrapper').innerHTML;
      const originalContents = document.body.innerHTML;
  
      document.body.innerHTML = printContents;
  
      window.print();
  
      document.body.innerHTML = originalContents;
    }
  }

  new themeSpartan_2(window.parent.themeSpartan_2);