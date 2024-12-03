// src/components/Ticket.jsx
import React from 'react';
import '../styles/Ticket.css';

// Import Status Images
import inProgress from '../assets/icons_FEtask/inProgress.svg';
import todoImage from '../assets/icons_FEtask/todo.svg';
import backlogImage from '../assets/icons_FEtask/Backlog.svg';
import doneImage from '../assets/icons_FEtask/Done.svg';
import canceledImage from '../assets/icons_FEtask/Cancelled.svg';
import noPriority from '../assets/icons_FEtask/noPriority.svg'
import greycircle from '../assets/icons_FEtask/greycircle.png'
// Import Default Status Image (Optional)
import defaultStatus from '../assets/icons_FEtask/add.svg'; // Ensure you have this image

// Define a mapping from status labels to their corresponding images
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

    // Get status label from the ticket
    const statusLabel = ticket.status;
    const statusImage = statusImages[statusLabel] || defaultStatus; // Use default if status not found

    return (
        <div className="ticket">
            {/* Display Ticket ID */}
            <h3 className="ticket-id">{ticket.id}</h3>


            <div className="middle">
                {/* Conditionally display status image based on groupingOption */}

                {(groupingOption === 'user' || groupingOption === 'priority') && statusImage && (
                    <div className="ticket-status">
                        <img src={statusImage} alt={`${statusLabel} Status`} className="status-icon" />
                    </div>
                )}

                {/* Display Ticket Title */}
                <p className="ticket-title">{ticket.title}</p>

            </div>

            {/* Display Tags */}
            <div className="bottom">
                <div className="bottom-icon">
                    <img src={noPriority} alt="" />
                </div>
                <div className="bottom-feature">
                    <div className="temp">
                        <img style={{height:"11px"}} src={greycircle} alt="" />
                        <p>{ticket.tag.join(', ')}</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
