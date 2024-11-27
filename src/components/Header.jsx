import React from 'react';
import logoHeader from '../assets/LogoAuto_1.png'; // Importe a logo do cabeçalho

function Header() {
  return (
    <header className="app-header">
      <img src={logoHeader} alt="Logo da Aplicação" className="app-logo" />
      <h1>Controle de Manutenção de Veículos</h1>
    </header>
  );
}

export default Header;

