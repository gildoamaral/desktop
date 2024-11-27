import React from 'react';
import logoFooter from '../assets/LogoAuto_2.png'; // Importe a logo do rodapé

function Footer() {
  return (
    <footer className="app-footer">
      <img src={logoFooter} alt="Logo da Aplicação" className="footer-logo" />
      <p>&copy; {new Date().getFullYear()} Manutenção de Veículos</p>
    </footer>
  );
}

export default Footer;

