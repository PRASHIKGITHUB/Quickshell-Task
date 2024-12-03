// src/components/Ticket.jsx
import React from 'react';
import '../styles/Ticket.css';

// Import Status Images
import inProgress from '../assets/icons_FEtask/inProgress.svg';
import todoImage from '../assets/icons_FEtask/todo.svg';
import backlogImage from '../assets/icons_FEtask/Backlog.svg';
import doneImage from '../assets/icons_FEtask/Done.svg';
import canceledImage from '../assets/icons_FEtask/Cancelled.svg';

// Import Other Images
import noPriority from '../assets/icons_FEtask/noPriority.svg';
import greycircle from '../assets/icons_FEtask/greycircle.png';
import defaultStatus from '../assets/icons_FEtask/add.svg';
import defaultUser from '../assets/icons_FEtask/defaultUser.png';

const statusImages = {
    'Todo': todoImage,
    'In progress': inProgress,
    'Backlog': backlogImage,
    'Done': doneImage,
    'Canceled': canceledImage,
};

const Ticket = ({ ticket, users, groupingOption }) => {
    const user = users.find((u) => u.id === ticket.userId);

    const getPriorityLabel = (priority) => {
        const labels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
        return labels[priority] || 'Unknown';
    };

    const priorityLabel = getPriorityLabel(ticket.priority);

    const statusLabel = ticket.status;
    const statusImage = statusImages[statusLabel] || defaultStatus;

    return (
        <div className="ticket">
            <h3 className="ticket-id">{ticket.id}</h3>

            {/* Conditionally display defaultUser image based on groupingOption */}
            {(groupingOption === 'status' || groupingOption === 'priority') && (
                <img style={{height:"25px",width:"25px"}} src={defaultUser} alt="Assigned User" className="user-icon" />
            )}

            <div className="middle">
                {(groupingOption === 'user' || groupingOption === 'priority') && statusImage && (
                    <div className="ticket-status">
                        <img  src={statusImage} alt={`${statusLabel} Status`} className="status-icon" />
                    </div>
                )}

                <p className="ticket-title">{ticket.title}</p>
            </div>

            <div className="bottom">
                <div className="bottom-icon">
                    <img src={noPriority} alt="No Priority" />
                </div>
                <div className="bottom-feature">
                    <div className="temp">
                        <img style={{ height: '11px' }} src={greycircle} alt="Tag Icon" />
                        <p>{ticket.tag.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
