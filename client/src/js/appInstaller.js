document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  const installButton = document.getElementById('buttonInstall');
  console.log('Install button found:', installButton);

  if (installButton) {
    console.log('Install button exists, setting up event listeners');
    let deferredInstallPrompt;

    console.log('Setting up beforeinstallprompt event listener');
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('beforeinstallprompt event fired');
      event.preventDefault();
      deferredInstallPrompt = event;
      installButton.style.display = 'block';
    });

    console.log('Setting up click event listener for install button');
    installButton.addEventListener('click', async () => {
      console.log('Install button clicked');
      if (!deferredInstallPrompt) {
        console.log('No deferred install prompt available');
        console.log('Checking installation criteria:');
        console.log('- Is app served over HTTPS:', window.location.protocol === 'https:');
        console.log('- Has valid web manifest:', !!document.querySelector('link[rel="manifest"]'));
        console.log('- Has registered service worker:', 'serviceWorker' in navigator);
        return;
      }

      try {
        const result = await deferredInstallPrompt.prompt();
        console.log(`Install prompt result: ${result.outcome}`);
        deferredInstallPrompt = null;
        installButton.style.display = 'none';
      } catch (error) {
        console.error('Error during installation:', error);
      }
    });

    window.addEventListener('appinstalled', (event) => {
      console.log('Application installed successfully');
    });
  } else {
    console.warn('Install button not found in the DOM');
  }
});

window.addEventListener('load', () => {
  console.log('Window load event fired');
});