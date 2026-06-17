(function () {
  const LOAD_DELAY_MS = 1800;

  init();

  async function init() {
    try {
      const client = await app.initialized();
      client.events.on('app.activated', onActivated);
      await onActivated();
      bindDemos();
    } catch (error) {
      console.error('Catalog init failed:', error);
    }
  }

  async function onActivated() {
    try {
      const client = await app.initialized();
      await client.instance.resize({ height: '720px' });
    } catch (error) {
      console.warn('Resize not supported:', error);
    }
  }

  function bindDemos() {
    document.getElementById('show-toast').addEventListener('fwClick', showToast);
    document.getElementById('simulate-load').addEventListener('fwClick', simulateLoad);
    document.getElementById('toggle-skeleton').addEventListener('fwClick', toggleSkeleton);
  }

  function showToast() {
    const toast = document.getElementById('demo-toast');
    toast.trigger({
      type: 'success',
      content: 'Changes saved successfully.'
    });
  }

  async function simulateLoad() {
    const spinner = document.getElementById('demo-spinner');
    const status = document.getElementById('load-status');
    const button = document.getElementById('simulate-load');

    spinner.removeAttribute('hidden');
    status.textContent = 'Loading…';
    button.setAttribute('disabled', '');

    await delay(LOAD_DELAY_MS);

    spinner.setAttribute('hidden', '');
    status.textContent = 'Done';
    button.removeAttribute('disabled');
  }

  function toggleSkeleton() {
    const area = document.getElementById('skeleton-area');
    area.hidden = !area.hidden;
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
})();
