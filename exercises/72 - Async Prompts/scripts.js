function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open')
  await wait(1000)
  popup.remove();
  
}

function ask(options) {
  return new Promise(async function (resolve) {
    const popup = document.createElement('form')
    popup.classList.add('popup')
    popup.insertAdjacentHTML('afterbegin', 
    `<fieldset>
      <label>${options.title}</label>
      <input type='text' name='input' />
      <button type='submit'>Submit </button>
    </fieldset>
    `);

    if(options.cancel) {
      const skipButton = document.createElement('button')
      skipButton.type = 'button'
      skipButton.textContent = 'Cancel'
      popup.firstChild.appendChild(skipButton)
    }

    popup.addEventListener('submit', function(e) {
      e.preventDefault();
      resolve(e.target.input.value)
      destroyPopup(popup)
    }, {once: true}) 


    document.body.appendChild(popup)
    await wait(50)
    popup.classList.add('open')
  });
}