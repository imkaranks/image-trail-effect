(function () {
  const $heroSection = document.querySelector('.hero');
  const images = [
    'https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFpbnRpbmdzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1556005693-00fff02f134c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhaW50aW5nc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1661529221722-c4a1705f3b20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1haGFiaGFyYXRhJTIwcGFpbnRpbmdzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhaW50aW5ncyUyMGFydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1579541671172-43429ce17aca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBhaW50aW5ncyUyMGFydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1549289524-06cf8837ace5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1583119912267-cc97c911e416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  ];
  let currentImage = -1;

  if (window.matchMedia('(pointer: fine)').matches) {
    $heroSection.addEventListener(
      'mousemove', throttleFn(imageTrail, 150)
    );
  }

  function getNewImage() {
    if (currentImage < images.length-1) {
      currentImage++;
    } else {
      currentImage = 0;
    }
    return images[currentImage];
  }

  function throttleFn(callback, delay) {
    let prev = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - prev > delay) {
        prev = now;
        return callback(...args);
      }
    }
  }

  function imageTrail(event) {
    const $imgWrapper = document.createElement('div');
    const $img = document.createElement('img');

    $imgWrapper.className = 'img__wrapper';
    $imgWrapper.style.top = event.clientY - 125 + 'px';
    $imgWrapper.style.left = event.clientX - 100 + 'px';
    $imgWrapper.style.transform = `rotate(${(Math.floor(Math.random() * 10)) * (Math.round(Math.random()) ? 1 : -1)}deg)`;
    $img.src = getNewImage();

    gsap.to($img, {
      y: 0,
      ease: 'power2',
      duration: 0.5
    });

    gsap.to($img, {
      y: '100%',
      ease: 'power1',
      delay: 0.5,
      duration: 0.5
    });

    $imgWrapper.appendChild($img);
    document.body.appendChild($imgWrapper);

    setTimeout(() =>
      $imgWrapper.remove()
    , 1000);
  }
})();