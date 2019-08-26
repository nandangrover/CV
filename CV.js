class resume {
  constructor() {
    this.jsonURL = 'config.json';
    this.config = {};
    this.elemObj = {};
    this.loadSequence('loadJSON');
  }

  loadSequence(loadFunction) {
    switch(loadFunction) {
      case 'loadJSON':
        this.loadJSON();
      break; 
      case 'createElements':
        this.createElements();
      break;
    }
  }

  loadJSON() {
    fetch(this.jsonURL, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => {
      this.config = response;
      this.loadSequence('createElements');
    })
    .catch(error => console.error('Error:', error));
  }

  createElements() {
    this.topNavigation();
    
    this.resumeContent();
  }

  topNavigation() {
    this.createDiv({ className: 'topNavContainer', id: 'topNavContainer', appendTo: 'main' });

    this.createDiv({ className: 'leftPartition', id: 'leftPartition', appendTo: 'topNavContainer' });
    // left-block
    this.createDiv({ className: 'leftBlock', id: 'leftBlock', appendTo: 'leftPartition' });
    // text-bloc
    this.createDiv({ className: 'textBlock', id: 'textBlock', appendTo: 'leftPartition' });
    // name
    this.createDiv({ className: 'name', id: 'name', appendTo: 'textBlock', html: this.config.elements.topNav.name });
    // designation
    this.createDiv({ className: 'designation', id: 'designation', appendTo: 'textBlock', html: this.config.elements.topNav.designation });
    // bio
    this.createDiv({ className: 'bio', id: 'bio', appendTo: 'textBlock', html: this.config.elements.topNav.bio });

    this.createDiv({ className: 'rightPartition', id: 'rightPartition', appendTo: 'topNavContainer' });

    //icon holder
    this.createDiv({ className: 'iconsHolder', id: 'iconsHolder', appendTo: 'rightPartition' });


    // message Icon
    this.createDiv({ className: 'iconHolder', id: 'iconHolder1', appendTo: 'iconsHolder' });
    this.createDiv({ className: 'iconText', id: 'email', appendTo: 'iconHolder1', html: this.config.elements.topNav.email });
    this.createDiv({ className: 'icon', id: 'icon1', appendTo: 'iconHolder1' });
    this.createDiv({ className: 'fas fa-envelope icon', id: 'email', appendTo: 'icon1' });

    // mobile Icon
    this.createDiv({ className: 'iconHolder', id: 'iconHolder2', appendTo: 'iconsHolder' });
    this.createDiv({ className: 'iconText', id: 'number', appendTo: 'iconHolder2', html: this.config.elements.topNav.number });
    this.createDiv({ className: 'icon', id: 'icon2', appendTo: 'iconHolder2' });
    this.createDiv({ className: 'fas fa-mobile-alt icon', id: 'number', appendTo: 'icon2' });

    // location Icon
    this.createDiv({ className: 'iconHolder', id: 'iconHolder3', appendTo: 'iconsHolder' });
    this.createDiv({ className: 'iconText', id: 'location', appendTo: 'iconHolder3', html: this.config.elements.topNav.location });
    this.createDiv({ className: 'icon', id: 'icon3', appendTo: 'iconHolder3' });
    this.createDiv({ className: 'fas fa-map-marker-alt icon', id: 'location', appendTo: 'icon3' });
    
  }

  resumeContent() {
    this.createDiv({ className: 'resumeContent', id: 'resumeContent', appendTo: 'main' });

    this.createDiv({ className: 'leftPartition', id: 'leftPartitionContent', appendTo: 'resumeContent' });

    this.createDiv({ className: 'workExperience', id: 'workExperience', appendTo: 'leftPartitionContent' });

    this.createDiv({ className: 'header', id: 'workExperienceHeader', appendTo: 'workExperience', html:  this.config.elements.resumeContent[0].header});

    this.config.elements.resumeContent[0].workExperience.forEach((element, idx) => {
      this.createDiv({ className: 'blockHolder', id: `blockHolder_${idx}`, appendTo: 'workExperience' });
      // left-block
      this.createDiv({ className: 'leftBlock contentColor', id: 'leftBlock', appendTo: `blockHolder_${idx}` });
      // text-bloc
      this.createDiv({ className: 'textBlock', id: `textBlock_${idx}`, appendTo: `blockHolder_${idx}` });

      this.createDiv({ className: 'designation contentDesig', id: `designation_${idx}`, appendTo: `textBlock_${idx}`, html: this.config.elements.resumeContent[0].workExperience[idx]['designation'] });

      this.createDiv({ className: 'companyName', id: `companyName_${idx}`, appendTo: `textBlock_${idx}`, html: this.config.elements.resumeContent[0].workExperience[idx]['companyName'] });

      this.createDiv({ className: 'dateStarted', id: `dateStarted_${idx}`, appendTo: `textBlock_${idx}`, html: this.config.elements.resumeContent[0].workExperience[idx]['dateStarted'] });

      this.createDiv({ className: 'locationCompany', id: `locationCompany_${idx}`, appendTo: `textBlock_${idx}`, html: this.config.elements.resumeContent[0].workExperience[idx]['location'] });
    });
  }

  createDiv({ className, id, appendTo, html = '' }) {
    const div = document.createElement('div');
    div.setAttribute('class', className);
    div.setAttribute('id', id);
    document.getElementById(appendTo).appendChild(div);
    div.innerHTML = html;
    return div;
  }


}

new resume();