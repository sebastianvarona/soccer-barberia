import Dexie from 'dexie';

const db = new Dexie('myDatabase');
db.version(1).stores({
  barbers: '++id, name, createdAt', // Primary key and indexed props
  services: '++id, name, cost',
  orders: '++id, total, barber, services, createdAt',
  expenses: '++id, name, description, cost, createdAt',
});

export default db;
