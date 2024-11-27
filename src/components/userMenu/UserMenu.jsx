// UserMenu.jsx
import React, { useState } from 'react';
import './UserMenu.css'; // Para estilos do menu (opcional)

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="user-menu">
            <button className="user-menu-button" onClick={toggleMenu}>
                Usuário
            </button>
            {isOpen && (
                <div className="user-menu-dropdown">
                    <ul>
                        <li><a href="#profile">Perfil</a></li>
                        <li><a href="#settings">Configurações</a></li>
                        <li><a href="#logout">Sair</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
