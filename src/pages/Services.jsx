import React, { useState } from 'react';
import db from '../database';
import { useLiveQuery } from 'dexie-react-hooks';

export default function Services() {
  const [service, setService] = useState({
    name: '',
    cost: null,
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.services.add(service);
      setMessage('Servicio creado exitosamente!');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setMessage('Ha ocurrido un error');
      console.log(error);
    }
  };

  const response = useLiveQuery(async () => {
    const services = await db.services.toArray();
    return services;
  }, []);

  return (
    <>
      <h2 className="font-medium text-4xl mb-8">Crear Servicio</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12">
        <input
          value={service.name}
          onChange={(e) => {
            setService({
              name: e.target.value.toLowerCase(),
              cost: service.cost,
            });
          }}
          className="rounded-xl px-2 py-1 border max-w-xs"
          type="text"
          placeholder="Nombre..."
        />
        <input
          value={service.cost}
          onChange={(e) => {
            setService({
              name: service.name,
              cost: parseInt(e.target.value),
            });
          }}
          className="rounded-xl px-2 py-1 border max-w-xs"
          type="text"
          placeholder="Costo (sin comas o puntos)..."
        />
        <div>
          <input
            className="bg-green-500 hover:bg-green-600 transition rounded-xl px-8 py-1 font-bold text-white cursor-pointer	"
            type="submit"
            value="Crear"
          />
        </div>
      </form>
      <p className="mb-4 text-gray-500">{message}</p>
      <div className="border rounded-xl p-2">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 text-left font-medium">Id</th>
              <th className="px-4 text-left font-medium">Name</th>
              <th className="px-4 text-left font-medium">Precio</th>
            </tr>
          </thead>
          <tbody>
            {response?.map((services) => (
              <tr key={services.id} className="text-gray-500">
                <td className="px-4">{services.id}</td>
                <td className="px-4 capitalize font-medium">{services.name}</td>
                <td className="px-4 capitalize font-medium">
                  {new Intl.NumberFormat().format(services.cost)} COP
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
