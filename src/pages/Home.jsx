import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import db from '../database';
import { useLiveQuery } from 'dexie-react-hooks';
import { format, lightFormat } from 'date-fns';
import { es } from 'date-fns/esm/locale';

export default function Home() {
  const [today, setToday] = useState(
    format(new Date(), "d 'de' MMMM", {
      locale: es,
    })
  );
  const [barber, setBarber] = useState('');
  const [service, setService] = useState('');
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');

  const handleBChange = (event) => {
    setBarber(event.target.value);
  };
  const handleSChange = (event) => {
    let str = event.target.value.split('###');
    console.log(event.target.value);
    let cost = str[1];
    setService(event.target.value);
    setTotal(cost);
  };

  const barbersResponse = useLiveQuery(async () => {
    const barbers = await db.barbers.toArray();
    return barbers;
  }, []);

  const servicesResponse = useLiveQuery(async () => {
    const services = await db.services.toArray();
    return services;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.orders.add({
        total,
        barber,
        service: service.split('###')[0],
        createdAt: lightFormat(new Date(), "yyyy/MM/dd'T'HH:mm:ss"),
      });
      setMessage('Venta registrada exitosamente!');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setMessage('Ha ocurrido un error');
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="font-medium text-4xl mb-2">Nueva Venta</h2>
      <h3 className="ml-auto font-medium text-xl text-gray-500 mb-8">
        {today}
      </h3>
      <p className="mb-4 text-gray-500">{message}</p>
      <form onSubmit={handleSubmit} className="text-black">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="barbero-label">Seleccionar barbero...</InputLabel>
            <Select
              labelId="barbero-label"
              id="barbero"
              value={barber}
              label="Seleccionar barbero..."
              onChange={handleBChange}
            >
              {barbersResponse?.map((b) => {
                return (
                  <MenuItem key={b.id} value={b.name}>
                    <span className="capitalize">{b.name}</span>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <div className="h-4"></div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="servicio-label">Seleccionar servicio...</InputLabel>
            <Select
              labelId="servicio-label"
              id="servicio"
              value={service}
              label="Seleccionar servicio..."
              onChange={handleSChange}
            >
              {servicesResponse?.map((s) => {
                return (
                  <MenuItem key={s.id} value={`${s.name}###${s.cost}`}>
                    <span className="capitalize">{s.name}</span>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <div className="h-16"></div>
        <p className="text-2xl font-medium text-green-500">
          Total de la venta: {new Intl.NumberFormat().format(total)} COP
        </p>
        <div className="pt-8">
          <input
            className="bg-green-500 hover:bg-green-600 transition rounded-xl px-8 py-1 font-bold text-white cursor-pointer	"
            type="submit"
            value="Registrar"
          />
        </div>
      </form>
    </>
  );
}
