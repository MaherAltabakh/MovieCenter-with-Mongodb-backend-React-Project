import React, { Component } from "react";

class ShowConfirmation extends Component {

    handleDeleteClick = () => {
        setShowConfirmation(true);
      };
    
       handleConfirmDelete = async () => {
        // we will implement an optimistic update
        const originalMovies = this.state.movies;
        const updatedMovies = originalMovies.filter((m) => movie._id !== m._id);
        this.setState({ movies: updatedMovies });
        try {
          await deleteMovie(movie._id);
        } catch (ex) {
          if (ex.response && ex.response.status === 404) {
            toast.error("This movie has already been deleted!");
          }
          this.setState({ movies: originalMovies });
        }
    
        //here we are setting the current page to a previous one if there is no item on the current page
        if (!itemNumbers) {
          const currentPage = this.state.currentPage - 1;
          this.setState({ currentPage });
        }
    
        setShowConfirmation(false);
      };
    
       handleCancelDelete = () => {
        // User clicked "Cancel," close the confirmation dialog
        setShowConfirmation(false);
      };

    render() { 
        return ();
    }
}
 
export default ShowConfirmation;


import React, { useState } from 'react';

function DeleteComponent() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete operation here.
    // This is where you would place your code to delete something.
    // For example: deleteData();

    // After successful deletion, close the confirmation dialog
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    // User clicked "Cancel," close the confirmation dialog
    setShowConfirmation(false);
  };

  return (
    <div>
      {/* Your component content here */}
      <button onClick={handleDeleteClick}>Delete</button>

      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete?</p>
          <button onClick={handleConfirmDelete}>OK</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default DeleteComponent;





  

  