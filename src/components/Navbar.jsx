
function Navbar() {
  return (
    <nav className="app-navbar">
      <ul>
        <li><a href="/app/motoristas">Motoristas</a></li>
        <li><a href="/app/veiculos">Veículos</a></li>
        <li><a href="/app/editar">Perfil do Usuário</a></li>
        {/* <li><a href="/app/settings">Configurações</a></li>   */}
      </ul>
    </nav>
  );
}

export default Navbar;
