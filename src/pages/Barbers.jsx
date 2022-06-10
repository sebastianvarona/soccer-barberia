import React, { useState } from 'react';
import db from '../database';
import { useLiveQuery } from 'dexie-react-hooks';
import { lightFormat } from 'date-fns';

export default function Barbers() {
  const [barber, setBarber] = useState({
    name: '',
    createdAt: null,
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.barbers.add(barber);
      setMessage('Barbero creado exitosamente!');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setMessage('Ha ocurrido un error');
      console.log(error);
    }
  };

  const response = useLiveQuery(async () => {
    const barbers = await db.barbers.toArray();
    return barbers;
  }, []);

  return (
    <>
      <h2 className="font-medium text-4xl mb-8">Crear Barbero</h2>
      <form onSubmit={handleSubmit} className="flex gap-4 mb-12">
        <input
          value={barber.name}
          onChange={(e) => {
            setBarber({
              name: e.target.value.toLowerCase(),
              createdAt: lightFormat(new Date(), "yyyy/MM/dd'T'HH:mm:ss"),
            });
          }}
          className="rounded-xl px-2 py-1 border"
          type="text"
          placeholder="Nombre..."
        />
        <input
          className="bg-green-500 hover:bg-green-600 transition rounded-xl px-2 font-bold text-white cursor-pointer	"
          type="submit"
          value="Crear"
        />
      </form>
      <p className="mb-4 text-gray-500">{message}</p>
      <div className="border rounded-xl p-2">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 text-left font-medium">Id</th>
              <th className="px-4 text-left font-medium">Name</th>
              {/* <th className="px-4 text-left font-medium">Fecha de creacion</th> */}
            </tr>
          </thead>
          <tbody>
            {response?.map((barber) => (
              <tr key={barber.id} className="text-gray-500">
                <td className="px-4">{barber.id}</td>
                <td className="px-4 capitalize font-medium">{barber.name}</td>
                {/* <td className="px-4">
                  {JSON.stringify(barber.createdAt).split('T')[0].slice(1)}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
