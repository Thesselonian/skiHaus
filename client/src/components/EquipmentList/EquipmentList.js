import React, { useState } from "react";
import { ListGroup, Card, Col, Row } from "react-bootstrap";

const EquipmentList = (
  { 
    equipmentData, 
    categoryState, 
    setContractData, 
    contractData,
    setContractStep,
    contractStep 
  }

) => {
  //if statement trying to make the equipment list work for Chad's purposes
  if(!categoryState) {
    console.log('no categoryState')
    equipmentSelected = equipmentData

    const handleEquipmentSubmit = (event) => {
      console.log(event)
    }
  
    return (
      <>
        <ul className="equipment-list">
          {equipmentSelected.map((equipment) => (
            <Card>
              <button
                className="contract-navigation-button"
                key={equipment._id} 
                id={equipment._id}
                onClick={handleEquipmentSubmit}>
                <span>
                  Brand : {equipment.brand}
                </span>
                <span>
                  Model : {equipment.model}
                </span>
              </button>
            </Card>
          ))}
        </ul>
      </>
    );
  }

  const category = categoryState.category.toLowerCase()
  const equipmentSelected=equipmentData[category]

  const handleEquipmentSubmit = (event) => {
    event.preventDefault();
    const selectedEquipment = event.target.id
    const categoryArray = contractData.equipment[category]
    const updatedCategoryArray = [...categoryArray, selectedEquipment]
    contractData.equipment[category] = updatedCategoryArray
    setContractData({
      ...contractData
    })
  }

  const handleNextPage = (event) => {
    event.preventDefault();
    setContractStep({
      ...contractStep,
      step: '4'})
  }

  let equipmentAvailable = []
  equipmentSelected.forEach((equipment) => {
    if(equipment.available) {
      equipmentAvailable.push(equipment)
    } 
  })
  
  return (
    <>
      <Col className="dashboard-col">
        <Card className="equipment-card" bg="dark" style={{ width: "45rem"}}>
          <h3 className="span-text">Select the {category} you would like to add</h3>
          <ul className="equipment-list">
            {equipmentAvailable.map((equipment) => ( 
              <button
                className="contract-navigation-button"
                key={equipment._id} 
                id={equipment._id}
                onClick={handleEquipmentSubmit}>
                  Brand : {equipment.brand}<br />
                  Model : {equipment.model}
              </button>
            ))}
          </ul>
          <button 
            className="contract-navigation-button" 
            onClick={handleNextPage}>
            Proceed to Finalize Contract
          </button>
        </Card>
      </Col>
    </>
  );
};

export default EquipmentList;