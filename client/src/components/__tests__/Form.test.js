import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../eventForm/Form";
import {EventContextProvider} from '../eventContext'

const MockForm = ({isEditing, theClass, eventInfo}) => {
    return (
        <EventContextProvider>
            <Form isEditing={isEditing} theClass={theClass} eventInfo={eventInfo}/>
        </EventContextProvider>
    )
}

// Set up integration test using the parent component of Form and EventList (which is the home component)

describe("Form Tests", () => {
    // Add event form block
    describe("Add Event Form Tests", () => {
        // Test to make sure Main Form is loading when isEditing is false and the class is "mainForm"
        test('Should render "Add Event" when isEditing is false and class is mainForm', () => {
            // Render the component to test
            render(<MockForm isEditing={false} theClass="mainForm"/>)
            // Find the component you want to interact with
            const addButton = screen.getByRole("button")
            // Expect to find that element
            expect(addButton).toHaveTextContent('Add Event')
        })

        // Tests to make sure input form values change
        // Event Name
        test("Event Name value changes according to user input", () => {
            render(
                <MockForm 
                    isEditing={false} 
                    theClass="mainForm"
                />)
            const inputElement = screen.getByPlaceholderText('Event Name')
            fireEvent.change(inputElement, { target: {value: 'Testing Event Name'} })
            expect(inputElement.value).toBe("Testing Event Name")
        })

        // Event Description
        test("Event Description value changes according to user input", () => {
            render(
                <MockForm 
                    isEditing={false} 
                    theClass="mainForm"
                />)
            const inputElement = screen.getByPlaceholderText('Event Description')
            fireEvent.change(inputElement, { target: {value: 'Testing Event Description'} })
            expect(inputElement.value).toBe("Testing Event Description")
        })

        // Company Name
        test("Company value changes according to user input", () => {
            render(
                <MockForm 
                    isEditing={false} 
                    theClass="mainForm"
                />)
            const inputElement = screen.getByPlaceholderText('Company Name')
            fireEvent.change(inputElement, { target: {value: 'Testing Company Name'} })
            expect(inputElement.value).toBe("Testing Company Name")
        })

        // Color
        test("Color value changes according to user selection", () => {
            render(
                <MockForm 
                    isEditing={false} 
                    theClass="mainForm"
                />)
            const inputElement = screen.getByTestId('colorSelector')
            fireEvent.change(inputElement, { target: {value: 'green'} })
            expect(inputElement.value).toBe("green")
        })
    })
    
    
    // Update event form block
    describe("Update Event Form Tests", () => {
        // Test to make sure update from is rendering when isEditing is true and the class is "updateForm"
        test('Should render "Update Event" when isEditing is true and class is updateForm', () => {
            render(<MockForm isEditing={true} theClass="updateForm"/>)
            const updateButton = screen.getByRole("button")
            // expect(updateButton).toHaveTextContent('Update Event')
            // Or
            expect(updateButton.textContent).toBe('Update Event')
        })

        // Test to make sure input form values change
    })
})
