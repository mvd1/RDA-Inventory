import React from "react";
import Button from "react-bootstrap/Button";

const removeWarehouse = (index) => {
    //give alert to user that the content will be deleted forever
    
    let confirmDelete = window.confirm('Are you sure you want to delete this warehouse and its content forever?')
    if(confirmDelete){
        //find way to specify which remove button was clicked (maybe row index)
        //remove (front end) warehouse name, city, state, zipcode
        //remove (back end) warehouse id, warehouse name, city, state, zipcode, product name, type, date, unit price, quantity, and total price (AXIOS)
    }
    if(!confirmDelete){ 
        //return to normal state as if nothing happened
    }
}