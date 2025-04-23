import { useEffect, useState } from 'react';

export const useLiveBotAge = (createdAt) => {
  const [age, setAge] = useState('');

  useEffect(() => {
    if (!createdAt) {
      setAge('N/A');
      return;
    }

    const startDate = new Date(createdAt);
    if (isNaN(startDate.getTime())) {
      setAge('N/A');
      return;
    }

    const updateAge = () => {
      const now = new Date();
      const diff = now - startDate;

      if (diff < 0) {
        setAge('0d 0h 0m 0s');
        return;
      }

      const seconds = Math.floor(diff / 1000);
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      setAge(`${days}d ${hours}h ${minutes}m ${secs}s`);
    };

    updateAge();
    const interval = setInterval(updateAge, 1000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return age;
};
