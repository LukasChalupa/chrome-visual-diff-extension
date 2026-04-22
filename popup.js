document.addEventListener('DOMContentLoaded', async () => {
  const cap1 = document.getElementById('cap1');
  const cap2 = document.getElementById('cap2');
  const compare = document.getElementById('compare');
  const clear = document.getElementById('clear');
  const thumb1 = document.getElementById('thumb1');
  const thumb2 = document.getElementById('thumb2');

  function updateUI(data) {
    if (data.img1) {
      thumb1.src = data.img1;
      thumb1.style.display = 'block';
      cap1.textContent = 'Retake Base (1)';
    } else {
      thumb1.removeAttribute('src');
      thumb1.style.display = 'none';
      cap1.textContent = 'Capture Base (1)';
    }

    if (data.img2) {
      thumb2.src = data.img2;
      thumb2.style.display = 'block';
      cap2.textContent = 'Retake New (2)';
    } else {
      thumb2.removeAttribute('src');
      thumb2.style.display = 'none';
      cap2.textContent = 'Capture New (2)';
    }

    compare.disabled = !(data.img1 && data.img2);
  }

  // Load existing images if any
  const data = await chrome.storage.local.get(['img1', 'img2']);
  updateUI(data);

  async function capture() {
    try {
      return await chrome.tabs.captureVisibleTab(null, { format: 'png' });
    } catch (err) {
      console.error(err);
      alert('Failed to capture screenshot: ' + err.message);
      return null;
    }
  }

  cap1.onclick = async () => {
    cap1.textContent = 'Capturing...';
    cap1.disabled = true;
    
    // Slight delay to allow popup UI to update before taking the screenshot,
    // though captureVisibleTab usually captures the underlying tab.
    await new Promise(r => setTimeout(r, 100));
    
    const img = await capture();
    if (img) {
      await chrome.storage.local.set({ 
        img1: img,
        dpr1: window.devicePixelRatio 
      });
    }
    
    cap1.disabled = false;
    updateUI(await chrome.storage.local.get(['img1', 'img2']));
  };

  cap2.onclick = async () => {
    cap2.textContent = 'Capturing...';
    cap2.disabled = true;
    
    await new Promise(r => setTimeout(r, 100));
    
    const img = await capture();
    if (img) {
      await chrome.storage.local.set({ 
        img2: img,
        dpr2: window.devicePixelRatio 
      });
    }
    
    cap2.disabled = false;
    updateUI(await chrome.storage.local.get(['img1', 'img2']));
  };

  clear.onclick = async () => {
    await chrome.storage.local.remove(['img1', 'img2', 'dpr1', 'dpr2']);
    updateUI({});
  };

  compare.onclick = () => {
    chrome.tabs.create({ url: 'compare.html' });
  };
});