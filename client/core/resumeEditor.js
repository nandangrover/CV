import themes from '../themes/index.js';
import gateway from '../utility/gateways.js';

class resumeEditor {
  constructor() {
    this.inputId = '';
    this.themeSelected = '';
    this.codeEditor = {};
    this.loadSequence('loadEditor');

    document.getElementById("submit").addEventListener('click', () => this.loadSequence('createStructure'));

    document.getElementById("submitJsonChange").addEventListener('click', () => this.loadSequence('submitJsonChange'));
  }


  loadSequence(loadFunction) {
    switch (loadFunction) {
      case 'loadEditor':
        this.loadEditor();
        break;
      case 'createStructure':
        this.createStructure();
        break;
      case 'submitJsonChange':
        this.submitJsonChange();
        break;
    }
  }

  loadEditor() {
    this.createElement({ className: 'textEditor', id: `textEditor`, appendTo: 'editorHolder' });

    this.codeEditor = ace.edit("textEditor");
    this.codeEditor.setTheme("ace/theme/twilight");
    this.codeEditor.session.setMode("ace/mode/json");

    // use setOptions method to set several options at once
    this.codeEditor.setOptions({
      autoScrollEditorIntoView: true,
      copyWithEmptySelection: true,
    });

    this.codeEditor.session.setUseWrapMode(true);

    document.getElementById('textEditor').style.fontSize = '20px';

    // Imput Elements
    this.createElement({ className: 'holder', id: `holder`, appendTo: 'main' });


    this.createElement({ className: 'heading-resume-editor', id: `heading-resume-editor`, appendTo: 'holder', type: 'h1', html: "Enter your name and select a theme to load previously loaded resumes or create new ones" });

    this.createElement({ className: 'info-holder', id: `info-holder`, appendTo: 'holder' });

    this.createElement({ className: 'resume-editor', id: `resume-editor`, appendTo: 'info-holder', type: 'input', attr: [{ key: 'placeholder', value: 'Enter your name' }] });

    this.createElement({ className: 'theme-selector', id: `theme-selector`, appendTo: 'info-holder', type: 'select', attr: [{ key: 'placeholder', value: 'Select a theme' }] });

    themes.forEach((theme, idx) => {
      this.createElement({ className: 'theme-selector-option', id: `theme-selector-option-${idx}`, html: theme.split('_')[0], appendTo: 'theme-selector', type: 'option', attr: [{ key: 'value', value: theme }] });
    })

    this.createElement({ className: 'submit', id: `submit`, appendTo: 'info-holder', type: 'button', html: 'Submit' });

    this.hideEditor();
  }

  async createStructure() {
    let config = {};
    this.inputId = document.getElementById("resume-editor").value;
    this.themeSelected = document.getElementById("theme-selector").value;

    try {
      config = await gateway.getJson(this.inputId, this.themeSelected);
      if (!config.length) {
        config = await gateway.setJson(this.inputId, this.themeSelected, JSON.stringify(await this.loadJSON(this.themeSelected)) || JSON.stringify(await this.loadJSON('themeElon_1')));
        this.setDefaultStructure(JSON.parse(config.jsonData));
      } else if (config[0].jsonData) {
        this.setDefaultStructure(JSON.parse(config[0].jsonData));
        // this.setDefaultStructure(await this.loadJSON(this.themeSelected));
      }
    } catch (e) {
      console.log(e);
      alert('Something went wrong. Please try again');
    }
  }

  async loadJSON(themeSelected) {
    const response = await fetch(`../config/${themeSelected}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.json();
  }

  setDefaultStructure(data, reload = false) {
    this.codeEditor.setValue(JSON.stringify(data, null, '\t'))
    if (!reload) {
      this.showEditor();
      document.body.removeChild(document.getElementById('main'));
    }
    // Load iFrame
    window[this.themeSelected] = data;
    let iFrame = document.getElementById("template");
    iFrame.src = `../themes/${this.themeSelected}/index.html`;
    iFrame.style.display = 'block';
  }

  async submitJsonChange() {
    // Before submitting check if it's valid JSON, if not, alert the user
    const jsonData = this.codeEditor.getValue();
    try {
      JSON.parse(jsonData);
    } catch (e) {
      alert('Invalid JSON. Please check your JSON and try again');
      return;
    }

    let config = {};
    try {
      config = await gateway.updateJson(this.inputId, this.themeSelected, this.codeEditor.getValue());
      this.setDefaultStructure(JSON.parse(config[0].jsonData), true);
      window.scrollTo(0, 0);
    } catch (e) {
      console.error(e);
    }
  }

  showEditor() {
    document.body.setAttribute('editor', 'true');
    document.getElementById("editorHolder").classList.add('editor-visible');
    document.getElementById("print").classList.add('editor-visible');
    document.getElementById("submitJsonChange").classList.add('editor-visible');
    document.getElementById("textEditor").classList.add('editor-visible');
  }


  hideEditor() {
    document.body.setAttribute('editor', 'false');
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