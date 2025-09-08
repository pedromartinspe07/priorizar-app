import { useState, useEffect } from 'react';
import api from '../services/api';

// Tipagem para uma meta
interface Goal {
  id: number;
  title: string;
  completed: boolean;
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar as metas da API
  const fetchGoals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/goals');
      setGoals(response.data);
    } catch (err) {
      console.error('Erro ao buscar metas:', err);
      setError('Não foi possível carregar as metas.');
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito para carregar as metas ao iniciar
  useEffect(() => {
    fetchGoals();
  }, []);

  // Adiciona uma nova meta
  const addGoal = async (title: string) => {
    try {
      const response = await api.post('/goals', { title });
      const newGoal = { ...response.data, id: response.data.id, title, completed: false };
      setGoals((prevGoals) => [...prevGoals, newGoal]);
    } catch (err) {
      console.error('Erro ao adicionar meta:', err);
      setError('Não foi possível adicionar a meta.');
    }
  };

  // Alterna o estado de conclusão de uma meta
  const toggleGoalComplete = async (goalId: number) => {
    const goalToUpdate = goals.find((g) => g.id === goalId);
    if (!goalToUpdate) return;

    const newCompletedStatus = !goalToUpdate.completed;

    // Atualização otimista da UI
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId ? { ...goal, completed: newCompletedStatus } : goal
      )
    );

    try {
      await api.put(`/goals/${goalId}`, { completed: newCompletedStatus });
    } catch (err) {
      console.error('Erro ao atualizar meta:', err);
      setError('Não foi possível atualizar a meta.');
      // Reverter a UI em caso de falha
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, completed: !newCompletedStatus } : goal
        )
      );
    }
  };

  return {
    goals,
    isLoading,
    error,
    fetchGoals,
    addGoal,
    toggleGoalComplete,
  };
}
