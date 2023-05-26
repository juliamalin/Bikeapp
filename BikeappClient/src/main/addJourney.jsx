import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendJourney } from '../services/journeyReducer'
import { InputLabel, TextField, Button, Dialog, DialogContent, DialogActions, Snackbar, DialogContentText } from '@mui/material'
import journeyService from '../services/journeygetters'

export const JourneyForm = () => {
    const dispatch = useDispatch()
    const [journeyData, setJourneyData] = useState({
        departureTime: '',
        returnTime: '',
        departureStationId: '',
        departureStationName: '',
        returnStationId: '',
        returnStationName: '',
        distance: '',
        duration: '',
    })

    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState({})
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setJourneyData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const validationErrors = validateForm(journeyData)
        if (Object.keys(validationErrors).length === 0) {
            try {
                dispatch(appendJourney(journeyData))
                await journeyService.createJourney(journeyData)
                setOpen(true)
                resetForm()
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    console.log('Error: Bad Request')
                } else {
                    console.log('Error:', error.message)
                }
            }
        } else {
            setErrors(validationErrors)
            setOpenSnackbar(true)
        }
    }


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
        })
        setErrors({})
    }

    const handleClose = () => {
        setOpen(false)
    }

    const validateForm = (data) => {
        const errors = {}

        if (!data.departureTime) {
            errors.departureTime = 'Departure time is required'
        }

        if (!data.returnTime) {
            errors.returnTime = 'Return time is required'
        }

        if (!data.departureStationId) {
            errors.departureStationId = 'Departure station id is required'
        } else if (isNaN(data.departureStationId)) {
            errors.departureStationId = 'Departure station id  must be a number'
        }

        if (!data.departureStationName) {
            errors.departureStationName = 'Departure station name is required'
        } else if (!/^[\w\säöÄÖ]+$/.test(data.departureStationName)) {
            errors.departureStationName = 'Departure station name must be a string'
        }

        if (!data.returnStationId) {
            errors.returnStationId = 'Return station id is required'
        } else if (isNaN(data.returnStationId)) {
            errors.returnStationId = 'Return station id  must be a number'
        }

        if (!data.returnStationName) {
            errors.returnStationName = 'Return station name is required'
        } else if (!/^[\w\säöÄÖ]+$/.test(data.returnStationName)) {
            errors.returnStationName = 'Return station name must be a string'
        }

        if (!data.distance) {
            errors.distance = 'Distance is required'
        } else if (isNaN(data.distance)) {
            errors.distance = 'Distance must be a number'
        }

        if (!data.duration) {
            errors.duration = 'Duration is required'
        } else if (isNaN(data.duration)) {
            errors.duration = 'Duration must be a number'
        }

        return errors
    }

    console.log(errors)


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
                    label="Distance (meters)"
                    type="number"
                    name="distance"
                    value={journeyData.distance}
                    onChange={handleInputChange}
                />
            </div>
            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                <TextField
                    label="Duration (seconds)"
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                style={{
                    backgroundColor: 'red',
                    opacity: 1,
                    right: '10px',
                }}
            >
                <DialogContentText>
                    {Object.entries(errors).map(([field, message]) => (
                        <li key={field}>{`${field}: ${message}`}</li>
                    ))}
                </DialogContentText>
            </Snackbar>
        </form>
    )
}