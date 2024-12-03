// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/App.css';

const App = () => {
  const [groupingOption, setGroupingOption] = useLocalStorage('groupingOption', 'status');
  const [orderingOption, setOrderingOption] = useLocalStorage('orderingOption', 'priority');

  return (
    <div className="app">
      <Navbar
        groupingOption={groupingOption}
        setGroupingOption={setGroupingOption}
        orderingOption={orderingOption}
        setOrderingOption={setOrderingOption}
      />
      <KanbanBoard
        groupingOption={groupingOption}
        orderingOption={orderingOption}
      />
    </div>
  );
};

export default App;
