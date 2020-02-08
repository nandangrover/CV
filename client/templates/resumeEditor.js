import Structure from '../utility/structure.js';
import gateway from '../utility/gateways.js';
import { defaultData } from '../configDefault.js';

class resumeEditor {
  constructor() {
    this.inputId = '';
    this.codeEditor = {};
    this.loadSequence('loadJSON');

    document.getElementById("submit").addEventListener('click', () => this.loadSequence('createStructure'))
    document.getElementById("submitJsonChange").addEventListener('click', () => this.loadSequence('submitJsonChange'))
  }

  loadSequence(loadFunction) {
    switch (loadFunction) {
      case 'loadJSON':
        this.loadJSON();
      break;
      case 'createStructure':
        this.createStructure();
      break;
      case 'submitJsonChange':
        this.submitJsonChange();
      break;
    }
  }

  loadJSON() {
    this.createElement({ className: 'editorHolder', id: `editorHolder`, appendTo: 'body' });
    this.createElement({ className: 'textEditor', id: `textEditor`, appendTo: 'editorHolder' });
    this.createElement({ className: 'submitJsonChange', id: `submitJsonChange`, appendTo: 'body', type: 'button', html: 'Submit JSON Change' });
    

    this.codeEditor = ace.edit("textEditor");
    this.codeEditor.setTheme("ace/theme/twilight");
    this.codeEditor.session.setMode("ace/mode/json");

    // use setOptions method to set several options at once
    this.codeEditor.setOptions({
      autoScrollEditorIntoView: true,
      copyWithEmptySelection: true,
    });

    this.codeEditor.session.setUseWrapMode(true);

    document.getElementById('textEditor').style.fontSize='20px'; 

    // Imput Elements
    this.createElement({ className: 'holder', id: `holder`, appendTo: 'main' });


    this.createElement({ className: 'heading-resume-editor', id: `heading-resume-editor`, appendTo: 'holder', type: 'h1', html: "Enter your name to load previously loaded resumes or create new ones" });

    this.createElement({ className: 'info-holder', id: `info-holder`, appendTo: 'holder' });

    this.createElement({ className: 'resume-editor', id: `resume-editor`, appendTo: 'info-holder', type: 'input', attr: [{ key: 'placeholder', value: 'Enter your name' }] });

    this.createElement({ className: 'submit', id: `submit`, appendTo: 'info-holder', type: 'button', html: 'Submit' });

    this.hideEditor();
  }

  async createStructure() {
    let config = {};
    this.inputId = document.getElementById("resume-editor").value;
  
    try {
      config = await gateway.getJson(this.inputId);
      if (!config.length) {
        config = await gateway.setJson(this.inputId, JSON.stringify(defaultData));
        this.setDefaultStructure(JSON.parse(config.jsonData));
      } else if (config.success && config.success === false) {
        console.error('Unauthorized access');
      } else if (config[0].jsonData) {
        this.setDefaultStructure(JSON.parse(config[0].jsonData));
      }
    } catch (e) {
      console.log(e)
    }
  }

  setDefaultStructure(data) {
    const main = document.getElementById('main');
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    this.codeEditor.setValue(JSON.stringify(data, null, '\t'))
    this.showEditor();
    // Make HTML
    new Structure(data);
  }

  async submitJsonChange() {
    let config = {};
    
    try {
      config = await gateway.updateJson(this.inputId, this.codeEditor.getValue());
      this.setDefaultStructure(JSON.parse(config[0].jsonData));
    } catch (e) {
      console.error(e);
    }
  }

  showEditor() {
    document.body.setAttribute('editor', 'true');
    document.getElementById("main").classList.add('editor-visible');
    document.getElementById("editorHolder").classList.add('editor-visible');
    document.getElementById("print").classList.add('editor-visible');
    document.getElementById("submitJsonChange").classList.add('editor-visible');
    document.body.appendChild(document.getElementById("print"));
    document.getElementById("textEditor").classList.add('editor-visible');
  }


  hideEditor() {
    document.body.setAttribute('editor', 'false');
    document.getElementById("main").classList.remove('editor-visible');
    document.getElementById("editorHolder").classList.remove('editor-visible');
    document.getElementById("print").classList.remove('editor-visible');
    document.getElementById("submitJsonChange").classList.remove('editor-visible');
    document.getElementById("textEditor").classList.remove('editor-visible');
  }

  createElement({ className, id, appendTo, html = '', type = 'div', attr = [] }) {
    const div = document.createElement(type);
    div.setAttribute('class', className);
    div.setAttribute('id', id);
    if (attr) {
      attr.forEach(({ key, value }) => div.setAttribute(key, value));
    }
    try {
      document.getElementById(appendTo).appendChild(div);
    } catch (e) {
      document.body.appendChild(div);
    }
    div.innerHTML = html;
    return div;
  }


}

new resumeEditor();