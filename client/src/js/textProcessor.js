import { retrieveContent, storeContent } from './contentStorage';
import { getDefaultText } from './defaultContent';

export default class TextProcessor {
  constructor() {
    this.initializeProcessor();
    this.loadContent();
  }

  initializeProcessor() {
    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not available');
    }

    // Initialize CodeMirror editor
    this.processor = CodeMirror(document.querySelector('#editor'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Save content to localStorage on change
    this.processor.on('change', () => {
      localStorage.setItem('tempContent', this.processor.getValue());
    });

    // Save content to IndexedDB when editor loses focus
    this.processor.on('blur', () => {
      console.log('Processor lost focus, storing content');
      storeContent(this.processor.getValue());
    });
  }

  async loadContent() {
    // Retrieve content from IndexedDB, localStorage, or use default
    const storedContent = await retrieveContent();
    const tempContent = localStorage.getItem('tempContent');
    const contentToLoad = storedContent || tempContent || getDefaultText();
    this.processor.setValue(contentToLoad);
  }
}