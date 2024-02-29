import './Modal.css';
import React, {useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ closeModal, onSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(
      defaultValue || {
        name: "",
        type: "standard",
        status: "active",
        startTime: '',
        endTime: ''
      }
    );
  
    const [startDate, setStartDate] = useState(formState.startTime);
    const [endDate, setEndDate] = useState(formState.endTime);
    const [errors, setErrors] = useState(false);
    const [validateDate, setValidateDate] = useState(false)
  
    const validateForm = () => {
        if (formState.name && formState.type && formState.status && formState.startTime && formState.endTime) {
          if (formState.startTime > formState.endTime) {
            setValidateDate(true)
            return false;
          }
          setErrors(false);
          return true;
        } else {
          setErrors(true);
          return false;
        }
      };
  
    const handleChange = (e) => {
        setFormState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
      
      const handleStartDateChange = (date) => {
        setStartDate(date);
        setFormState((prevState) => ({
          ...prevState,
          startTime: date,
        }));
      };
      
      const handleEndDateChange = (date) => {
        setEndDate(date);
        setFormState((prevState) => ({
          ...prevState,
          endTime: date,
        }));
      };
      
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      onSubmit(formState);
      toast.success('Campaign saved successfully!', {
        autoClose: 1500,
      });
      closeModal();
    };
  
    return (
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.target.className === "modal-container") {
            closeModal();
          }
        }}
      >
        <div className="modal">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input name="name" value={formState.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Type</label>
              <select name="type" value={formState.type} onChange={handleChange}>
                <option value="standard">Standard</option>
                <option value="abtest">AB-Test</option>
                <option value="mwtest">MV-Test</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="starttime">Campaign Start</label>
              <DatePicker selected={startDate} onChange={handleStartDateChange} />
            </div>
            <div className="form-group">
            <label htmlFor="endtime">Campaign End</label>
            <DatePicker selected={endDate} onChange={handleEndDateChange} />
          </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select name="status" value={formState.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="deleted">Deleted</option>
              </select>
            </div>
            {errors && <div className="error-msg">Please fill all the fields</div>}
            {validateDate && <div className="error-msg">Campaign start date cannot be earlier than end date</div>}

            <div className='btn-container'>
                <button className="btn btn-discard" type="button" onClick={closeModal}>
                Discard
                </button>
                <button className="btn" type="button" onClick={handleSubmit}>
                Submit
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Modal;
  