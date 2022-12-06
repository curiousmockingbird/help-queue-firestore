import React, { useState } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';

function TicketControl () {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formVisibleOnPage: false,
  //     mainTicketList: [],
  //     selectedTicket: null,
  //     editing: false
  //   };
  // }

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    if (selectedTicket != null) {
      setFormVisibleOnPage(false);
      setSelectedTicket(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleDeletingTicket = (id) => {
    const newMainTicketList = mainTicketList.filter(ticket => ticket.id !== id);
    setMainTicketList(newMainTicketList);
    setSelectedTicket(null);
    //using setState:
    // this.setState({
    //   mainTicketList: newMainTicketList,
    //   selectedTicket: null
    // });
  }

  const handleEditClick = () => {
    setEditing(true);
    // this.setState({editing: true});
  }

  const handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = mainTicketList
    //new code: from this.state.selectedTicket.id to selectedTicket.id
      .filter(ticket => ticket.id !== selectedTicket.id)
      .concat(ticketToEdit);
      
      setMainTicketList(editedMainTicketList);
      setEditing(false);
      setSelectedTicket(null);
    // this.setState({
    //   mainTicketList: editedMainTicketList,
    //   editing: false,
    //   selectedTicket: null
    // });
  }

  const handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = mainTicketList.concat(newTicket);
    // this.setState({mainTicketList: newMainTicketList});
    setMainTicketList(newMainTicketList);
    setFormVisibleOnPage(false)  
  }

  const handleChangingSelectedTicket = (id) => {
    // new code: updated variable name to 'selection'
    // so there's no clash with the state variable 'selectedTicket'
    const selection = mainTicketList.filter(ticket => ticket.id === id)[0];
    setSelectedTicket(selection);
    //this.setState({selectedTicket: selectedTicket});
  }

  let currentlyVisibleState = null;
  let buttonText = null; 
  if (editing ) {      
    currentlyVisibleState = <EditTicketForm ticket = {selectedTicket} onEditTicket = {handleEditingTicketInList} />
    buttonText = "Return to Ticket List";
  } else if (selectedTicket != null) {
    currentlyVisibleState = <TicketDetail 
    ticket={selectedTicket} 
    onClickingDelete={handleDeletingTicket}
    onClickingEdit = {handleEditClick} />
    buttonText = "Return to Ticket List";
  } else if (formVisibleOnPage) {
    currentlyVisibleState = <NewTicketForm onNewTicketCreation={handleAddingNewTicketToList}/>;
    buttonText = "Return to Ticket List"; 
  } else {
    currentlyVisibleState = <TicketList onTicketSelection={handleChangingSelectedTicket} 
    ticketList={mainTicketList} />;
    buttonText = "Add Ticket"; 
  }
  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={handleClick}>{buttonText}</button> 
    </React.Fragment>
  );
  

}

export default TicketControl;

