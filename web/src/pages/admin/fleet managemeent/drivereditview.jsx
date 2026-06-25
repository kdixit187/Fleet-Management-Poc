import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Edit({ driver, onSave, onClose }) {
    const [formData, setFormData] = useState({ ...driver });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <div>
                        <h5>Edit Driver: {driver.full_name}</h5>
                        <p>Modify driver credentials and compliance mappings.</p>
                    </div>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </ModalHeader>

                <ModalBody>
                    <FormSectionTitle>Personal Details</FormSectionTitle>
                    <FormGrid>
                        <FormGroup>
                            <label>Full Name</label>
                            <input name="full_name" value={formData.full_name} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Phone Number</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} />
                        </FormGroup>
                    </FormGrid>

                    <FormSectionTitle>Account Security</FormSectionTitle>
                    <FormGroup>
                        <label>New Password</label>
                        <input type="password" name="password" onChange={handleChange} placeholder="••••••••" />
                    </FormGroup>
                           <FormGroup>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" onChange={handleChange} placeholder="••••••••" />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <button className="btn-cancel" onClick={onClose}>Close Profile</button>
                    <button className="btn-submit" onClick={() => { /* API Call logic */ onSave(); }}>Save Changes</button>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
}

// Design jo image_325ea2.png se match karega:
const ModalOverlay = styled.div`
    position: fixed; inset: 0; background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center; z-index: 3000;
`;

const ModalContent = styled.div`
    background: white; width: 700px; border-radius: 12px; overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
`;
const ModalHeader = styled.div`
    padding: 24px; 
    border-bottom: 1px solid #e5e7eb; 
    background-color: #ffffff; 
    display: flex; 
    justify-content: space-between;
    align-items: flex-start;

    h5 { font-size: 18px; margin: 0; color: #0f172a; font-weight: 700; }
    p { font-size: 13px; color: #64748b; margin: 4px 0 0; }
    
    .close-btn {
        background: #f1f5f9; border: none; width: 30px; height: 30px;
        border-radius: 50%; cursor: pointer; color: #475569;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s;
        &:hover { background: #e2e8f0; }
    }
`;
const ModalBody = styled.div` padding: 24px; `;

const FormSectionTitle = styled.h6`
    color: #2563eb; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; margin: 20px 0 10px;
`;

const FormGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 16px; `;

const FormGroup = styled.div`
    margin-bottom: 20px; /* Thoda space badha diya */
    label { 
        display: block; font-size: 12px; font-weight: 600; 
        color: #475569; margin-bottom: 8px; text-transform: uppercase;
    }
    input { 
        width: 100%; padding: 12px; border: 1px solid #cbd5e1; 
        border-radius: 8px; font-size: 14px;
        &:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); outline: none; }
    }
`;

const ModalFooter = styled.div`
    padding: 20px 24px; background: #f8fafc; 
    display: flex; justify-content: flex-end; gap: 12px; border-radius: 0 0 12px 12px;
    button { padding: 10px 20px; font-weight: 600; border-radius: 8px; cursor: pointer; font-size: 14px; }
    .btn-submit { background: #2563eb; color: white; border: none; transition: 0.2s; &:hover { background: #1d4ed8; } }
    .btn-cancel { background: white; border: 1px solid #e2e8f0; color: #64748b; }
`;