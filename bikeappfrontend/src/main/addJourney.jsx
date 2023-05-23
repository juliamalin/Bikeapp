import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { appendJourney } from '../services/journeyReducer';
import { InputLabel, TextField, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import journeyService from '../services/journeygetters';

export const JourneyForm = () => {
  const dispatch = useDispatch();
  const [journeyData, setJourneyData] = useState({
    departureTime: '',
    returnTime: '',
    departureStationId: '',
    departureStationName: '',
    returnStationId: '',
    returnStationName: '',
    distance: '',
    duration: '',
  });
  const [open, setOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJourneyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(appendJourney(journeyData));
    journeyService.createJourney(journeyData);
    setOpen(true);
    resetForm();
  };

  const resetForm = () => {
    setJourneyData({
      departureTime: '',
      returnTime: '',
      departureStationId: '',
      departureStationName: '',
      returnStationId: '',
      returnStationName: '',
      distance: '',
      duration: '',
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Tähän lomakkeeseen voit täyttää uuden matkan tiedot</h3>
  <div style={{ marginBottom: '20px', marginTop: '20px' }}>
    <InputLabel>Departure Time</InputLabel>
    <TextField
      type="datetime-local"
      name="departureTime"
      value={journeyData.departureTime}
      onChange={handleInputChange}
    />
  </div>
  <div style={{ marginBottom: '20px', marginTop: '20px' }}>
    <InputLabel>Return Time</InputLabel>
    <TextField
      type="datetime-local"
      name="returnTime"
      value={journeyData.returnTime}
      onChange={handleInputChange}
    />
  </div>
  <div style={{ marginBottom: '20px', marginTop: '20px' }}>
    <TextField
      label="Departure Station ID"
      type="number"
      name="departureStationId"
      value={journeyData.departureStationId}
      onChange={handleInputChange}
    />
  </div>
  <div style={{ marginBottom: '20px', marginTop: '20px' }}>
    <TextField
      label="Departure Station Name"
      type="text"
      name="departureStationName"
      value={journeyData.departureStationName}
      onChange={handleInputChange}
    />
  </div>
  <div style={{ marginBottom: '20px', marginTop: '20px' }}>
    <TextField
      label="Return Station ID"
      type="number"
      name="returnStationId"
      value={journeyData.returnStationId}
      onChange={handleInputChange}
    />
  </div>
  <div style={{ marginBottom: '20px', marginTop: '20px' }}>
    <TextField
      label="Return Station Name"
      type="text"
      name="returnStationName"
      value={journeyData.returnStationName}
      onChange={handleInputChange}
    />
  </div>
  <div style={{ marginBottom: '20px', marginTop: '20px' }}>
    <TextField
      label="Distance"
      type="number"
      name="distance"
      value={journeyData.distance}
      onChange={handleInputChange}
    />
  </div>
  <div style={{ marginBottom: '20px', marginTop: '20px' }}>
    <TextField
      label="Duration"
      type="number"
      name="duration"
      value={journeyData.duration}
      onChange={handleInputChange}
    />
  </div>

      <Button variant="contained" type="submit">
        Submit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          Your journey form has been submitted successfully!
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
