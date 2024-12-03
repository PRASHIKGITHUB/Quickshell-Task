// src/components/KanbanBoard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from './Ticket';
import '../styles/KanbanBoard.css';

const KanbanBoard = ({ groupingOption, orderingOption }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setTickets(response.data.tickets);
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper functions
  const getPriorityLabel = (priority) => {
    const labels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
    return labels[priority] || 'Unknown';
  };

  const groupTickets = (tickets, option) => {
    const grouped = {};

    tickets.forEach(ticket => {
      let key;
      switch (option) {
        case 'status':
          key = ticket.status;
          break;
        case 'user':
          const user = users.find(u => u.id === ticket.userId);
          key = user ? user.name : 'Unassigned';
          break;
        case 'priority':
          key = getPriorityLabel(ticket.priority);
          break;
        default:
          key = 'Uncategorized';
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
    });

    return grouped;
  };

  const sortTickets = (ticketsArray, option) => {
    const sorted = [...ticketsArray];
    switch (option) {
      case 'priority':
        sorted.sort((a, b) => b.priority - a.priority);
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return sorted;
  };

  const processTickets = () => {
    const grouped = groupTickets(tickets, groupingOption);
    const sortedGrouped = {};

    Object.keys(grouped).forEach(key => {
      sortedGrouped[key] = sortTickets(grouped[key], orderingOption);
    });

    return sortedGrouped;
  };

  const groupedTickets = processTickets();

  if (loading) {
    return <div className="kanban-loading">Loading...</div>;
  }

  if (error) {
    return <div className="kanban-error">Error fetching data. Please try again later.</div>;
  }

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className="kanban-column">
          <h2>{groupKey}</h2>
          {groupedTickets[groupKey].map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} users={users} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
