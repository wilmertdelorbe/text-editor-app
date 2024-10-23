import { Workbox } from 'workbox-window';
import TextProcessor from './textProcessor';
import './appInstaller';
import '../css/style.css';

const editor = document.querySelector('#editor');
let textProcessor;

// Load content when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (editor) {
    textProcessor = new TextProcessor();
    console.log('Text Processor initialized');
  } else {
    console.error('Editor element not found');
  }
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/src-sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}