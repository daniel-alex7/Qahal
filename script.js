class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Alterna a classe 'active' na lista de navegação e no ícone
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    // Atualiza atributo aria-expanded para acessibilidade
    const expanded = this.mobileMenu.getAttribute('aria-expanded') === 'true';
    this.mobileMenu.setAttribute('aria-expanded', String(!expanded));
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  handleOutsideClick(event) {
    if (!this.navList.classList.contains(this.activeClass)) return;
    if (!this.navList.contains(event.target) && !this.mobileMenu.contains(event.target)) {
      this.navList.classList.remove(this.activeClass);
      this.mobileMenu.classList.remove(this.activeClass);
      this.mobileMenu.setAttribute('aria-expanded', 'false');
    }
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
      // Fecha menu ao clicar fora
      document.addEventListener('click', this.handleOutsideClick.bind(this));
      // Fecha menu com ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.navList.classList.remove(this.activeClass);
          this.mobileMenu.classList.remove(this.activeClass);
          this.mobileMenu.setAttribute('aria-expanded', 'false');
        }
      });
    }
    return this;
  }
}

// Inicialização
const mobileNavbar = new MobileNavbar(
  ".mobile-menu-icon",
  ".nav-list",
  ".nav-list li"
);

mobileNavbar.init();