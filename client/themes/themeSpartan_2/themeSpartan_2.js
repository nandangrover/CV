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