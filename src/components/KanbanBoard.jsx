import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from './Ticket';
import '../styles/KanbanBoard.css';
import highPriority from '../assets/icons_FEtask/highPriority.svg';
import lowPriority from '../assets/icons_FEtask/lowPriority.svg';
import mediumPriority from '../assets/icons_FEtask/mediumPriority.svg';
import noPriority from '../assets/icons_FEtask/noPriority.svg';
import urgent from '../assets/icons_FEtask/urgent.svg'
import inProgress from '../assets/icons_FEtask/inProgress.svg';
import todoImage from '../assets/icons_FEtask/todo.svg';
import backlogImage from '../assets/icons_FEtask/Backlog.svg';
import doneImage from '../assets/icons_FEtask/Done.svg';
import canceledImage from '../assets/icons_FEtask/Cancelled.svg';
import defaultUser from '../assets/icons_FEtask/defaultUser.png';
import addIcon from '../assets/icons_FEtask/add.svg';
import threeDotMenu from '../assets/icons_FEtask/3 dot menu.svg';


const priorityImages = {
    'High': highPriority,
    'Urgent': urgent,
    'Medium': mediumPriority,
    'Low': lowPriority,
    'No priority': noPriority,
};

const statusImages = {
    'Todo': todoImage,
    'In progress': inProgress,
    'Backlog': backlogImage,
    'Done': doneImage,
    'Canceled': canceledImage,
};

const userImages = {
    'default': defaultUser,
};

const KanbanBoard = ({ groupingOption, orderingOption }) => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    
    const allStatuses = ['Todo', 'In progress', 'Backlog', 'Done', 'Canceled'];

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

    
    const getPriorityLabel = (priority) => {
        const labels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
        return labels[priority] || 'Unknown';
    };

    const groupTickets = (tickets, option) => {
        const grouped = {};

        if (option === 'status') {
            allStatuses.forEach(status => {
                grouped[status] = [];
            });
        }

        tickets.forEach(ticket => {
            let key;
            switch (option) {
                case 'status':
                    key = ticket.status;
                    if (!allStatuses.includes(key)) {
                        key = 'Others';
                        if (!grouped[key]) {
                            grouped[key] = [];
                        }
                    }
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

            if (option === 'status') {
                grouped[key].push(ticket);
            } else {
                if (!grouped[key]) {
                    grouped[key] = [];
                }
                grouped[key].push(ticket);
            }
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

    const getGroupImage = (groupKey) => {
        switch (groupingOption) {
            case 'status':
                return statusImages[groupKey] || null;
            case 'priority':
                return priorityImages[groupKey] || null;
            case 'user':
                return userImages['default'];
            default:
                return null;
        }
    };

    if (loading) {
        return <div className="kanban-loading">Loading...</div>;
    }

    if (error) {
        return <div className="kanban-error">Error fetching data. Please try again later.</div>;
    }

    return (
        <div className="kanban-board">
            {Object.keys(groupedTickets).map((groupKey) => {
                const groupImage = getGroupImage(groupKey);
                const ticketCount = groupedTickets[groupKey].length;

                return (
                    <div key={groupKey} className="kanban-column">
                        <div className="group-header">
                            <div className="group-header-left">
                                {groupImage && <img style={{ height: "20px" }} src={groupImage} alt={`${groupKey} Icon`} className="group-icon" />}
                                <h2>
                                    <div className="center">
                                        <p id='name' > {groupKey}</p>

                                        <p style={{ fontWeight:"100", color:"#5e6c84",marginLeft:"10px"}} id='unique'> {ticketCount} </p>

                                    </div>

                                </h2>
                            </div>
                            <div className="group-header-right">
                                <img style={{ height: "20px", marginRight: "10px" }} src={addIcon} alt="Add Ticket" className="header-action-icon" />
                                <img style={{ marginRight: "15px" }} src={threeDotMenu} alt="More Options" className="header-action-icon" />
                            </div>
                        </div>
                        {ticketCount > 0 ? (
                            groupedTickets[groupKey].map((ticket) => (
                                <Ticket key={ticket.id} ticket={ticket} users={users} groupingOption={groupingOption} />
                            ))
                        ) : (
                            <p style={{fontFamily:"sans-serif"}} className="no-tickets">No Tasks</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default KanbanBoard;
