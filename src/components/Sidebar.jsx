import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = ['Inicio', 'Estadisticas', 'Barberos', 'Servicios'];
  return (
    <div className="flex flex-col gap-28 mr-8 pr-8 border-r border-gray-300">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        Soccer Barberia
      </h1>
      <ul className="flex flex-col gap-4">
        {menuItems.map((m, i) => {
          return (
            <Link
              key={i}
              to={m === 'Inicio' ? '' : `/${m.toLocaleLowerCase()}`}
            >
              <li
                key={i}
                className="hover:bg-gray-200/40 transition p-3 rounded-xl text-lg font-medium cursor-pointer"
              >
                {m}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
