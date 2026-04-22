document.addEventListener('DOMContentLoaded', async () => {
  const data = await chrome.storage.local.get(['img1', 'img2', 'dpr1', 'dpr2']);
  
  if (!data.img1 || !data.img2) {
    alert('Missing images. Please use the extension popup to capture both base and new screenshots.');
    return;
  }

  const imgBase = document.getElementById('imgBase');
  const imgNewOpacity = document.getElementById('imgNewOpacity');
  const imgNewSlider = document.getElementById('imgNewSlider');
  
  imgBase.src = data.img1;
  imgNewOpacity.src = data.img2;
  imgNewSlider.src = data.img2;

  // Sync widths once base image loads in case of resolution differences
  imgBase.onload = () => {
    const dpr = data.dpr1 || window.devicePixelRatio || 1;
    const width = imgBase.naturalWidth / dpr;
    const height = imgBase.naturalHeight / dpr;

    imgBase.style.width = width + 'px';
    imgBase.style.height = height + 'px';
    imgNewSlider.style.width = width + 'px';
    imgNewSlider.style.height = height + 'px';
    imgNewOpacity.style.width = width + 'px';
    imgNewOpacity.style.height = height + 'px';
  };

  const radios = document.querySelectorAll('input[name="mode"]');
  const opacityControls = document.getElementById('opacityControls');
  const opacitySlider = document.getElementById('opacitySlider');
  const opacityVal = document.getElementById('opacityVal');
  
  const sliderModeContainer = document.getElementById('sliderModeContainer');
  const swipeSlider = document.getElementById('swipeSlider');
  const sliderLine = document.getElementById('sliderLine');
  const sliderHandle = document.getElementById('sliderHandle');
  const imgNewSliderContainer = document.getElementById('imgNewSliderContainer');

  function updateMode() {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    if (mode === 'opacity') {
      imgNewOpacity.classList.remove('mode-hidden');
      opacityControls.classList.remove('mode-hidden');
      sliderModeContainer.classList.add('mode-hidden');
    } else {
      imgNewOpacity.classList.add('mode-hidden');
      opacityControls.classList.add('mode-hidden');
      sliderModeContainer.classList.remove('mode-hidden');
      updateSwipe(); // Refresh slider positions
    }
  }

  radios.forEach(r => r.addEventListener('change', updateMode));

  opacitySlider.addEventListener('input', (e) => {
    const val = e.target.value;
    opacityVal.textContent = val;
    imgNewOpacity.style.opacity = val;
  });

  function updateSwipe() {
    // Range is 0 to 1000 for smoother sliding, convert to percentage
    const percent = swipeSlider.value / 10;
    imgNewSliderContainer.style.width = `${percent}%`;
    sliderLine.style.left = `${percent}%`;
    sliderHandle.style.left = `${percent}%`;
  }

  swipeSlider.addEventListener('input', updateSwipe);
  
  // Initialize UI state
  updateMode();
  updateSwipe();
});