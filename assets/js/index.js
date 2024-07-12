(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('fa-bars');
    this.classList.toggle('fa-x');
  });

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  document.querySelectorAll('#navbar .nav-link').forEach((navLink) => {
    navLink.addEventListener('click', function(e) {
      // Obtém o valor do href do link
      let targetSectionId = this.getAttribute('href');
      let section = document.querySelector(targetSectionId);
  
      if (section) {
        e.preventDefault();
  
        let navbar = document.querySelector('#navbar');
        let header = document.querySelector('#header');
        let sections = document.querySelectorAll('section');
        let navlinks = document.querySelectorAll('#navbar .nav-link');
  
        navlinks.forEach((item) => {
          item.classList.remove('active');
        });
  
        this.classList.add('active');
  
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          let navbarToggle = document.querySelector('.mobile-nav-toggle');
          navbarToggle.classList.toggle('fa-bars');
          navbarToggle.classList.toggle('fa-x');
        }
  
        if (targetSectionId === '#header') {
          header.classList.remove('header-top');
          sections.forEach((item) => {
            item.classList.remove('section-show');
          });
          // Adiciona rolagem suave para a seção inicial
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          return;
        }
  
        if (!header.classList.contains('header-top')) {
          header.classList.add('header-top');
          setTimeout(function() {
            sections.forEach((item) => {
              item.classList.remove('section-show');
            });
            section.classList.add('section-show');
          }, 350);
        } else {
          sections.forEach((item) => {
            item.classList.remove('section-show');
          });
          section.classList.add('section-show');
        }
  
        // Atualiza a rolagem para a seção correspondente
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

})();
