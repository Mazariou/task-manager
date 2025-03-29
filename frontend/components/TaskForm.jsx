import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // récupère le JWT stocké
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks`, // URL backend
        {
          title,
          description,
          deadline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset du formulaire après envoi
      setTitle('');
      setDescription('');
      setDeadline('');

      // Appelle la fonction pour recharger la liste des tâches
      if (onTaskCreated) {
        onTaskCreated();
      }

    } catch (err) {
      console.error("Erreur lors de l'ajout de la tâche :", err.response?.data?.msg || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Créer la tâche</button>
    </form>
  );
};

export default TaskForm;
