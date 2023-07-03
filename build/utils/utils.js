const togglerLanguage = document.querySelectorAll('.togglerLanguage');

export const toggleLanguage = async (language) => {
    const response = await fetch(`./src/languages/${language}.json`);
    const translation = await (response.json());

    const textToChange = document.querySelectorAll("[data-section]");
    for (const text of textToChange){
        const section = text.dataset.section;
        const value = text.dataset.value;
        text.textContent = translation[section][value];
    }

    changeInputLanguage(language);
}

localStorage.getItem('language') === null ? localStorage.setItem('language', 'es') : toggleLanguage(localStorage.getItem('language'));

const changeInputLanguage = (language) => {
  const selectBtn = document.querySelector('.verificador__input');
  if (language === 'es') {
    selectBtn.setAttribute('data-content', 'Selecciona el archivo');
  } else {
    selectBtn.setAttribute('data-content', 'Select file');
  }
};

for (const toggler of togglerLanguage) {
    toggler.addEventListener('click', (e) => {
        toggleLanguage(e.target.parentElement.dataset.language);
        localStorage.setItem('language', e.target.parentElement.dataset.language);
    })
}
