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
          // this.loadSequence('createStructure');
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