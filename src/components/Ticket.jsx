// src/components/Ticket.jsx
import React from 'react';
import '../styles/Ticket.css';

const Ticket = ({ ticket, users }) => {
  const user = users.find((u) => u.id === ticket.userId);

  const getPriorityLabel = (priority) => {
    const labels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
    return labels[priority] || 'Unknown';
  };

  return (
    <div className="ticket">
      <h3 className="ticket-title">{ticket.title}</h3>
      <p><strong>Priority:</strong> {getPriorityLabel(ticket.priority)}</p>
      <p><strong>Assigned to:</strong> {user ? user.name : 'Unassigned'}</p>
      <p><strong>Tags:</strong> {ticket.tag.join(', ')}</p>
    </div>
  );
};

export default Ticket;
