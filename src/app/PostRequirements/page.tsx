"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ethers } from 'ethers';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import { useWebSocket } from '@/context/websocketContext';

interface FormData {
  projectInfo: string;
  cooperationType: string;
  cooperationIntro: string;
  cooperationConditions: string;
  amount: string;
  currency: string;
  nonFinancialCriteria: string;
  expiryTime: string;
}

interface EventType {
    id: string;
    pubkey: any;
    created_at: number;
    kind: number;
    content: FormData;
    sig?: string; 
}

function PostRequirements() {

  const [formData, setFormData] = useState<FormData>({
    projectInfo: '',
    cooperationType: '',
    cooperationIntro: '',
    cooperationConditions: '',
    amount: '',
    currency: '',
    nonFinancialCriteria: '',
    expiryTime: '',
  });
  const { send } = useWebSocket();


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionSelected = (selected: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: selected }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const json = JSON.stringify([0, ethereum.selectedAddress, Date.now(), 1, formData]);
    let event_hash_id = ethers.sha256(new TextEncoder().encode(json));
    let event: EventType = {
      "id": event_hash_id,
      "pubkey": ethereum.selectedAddress,
      "created_at": Math.floor(Date.now() / 1000),
      "kind": 1,
      "content": formData,
    }
    const sig = await ethereum.request({
      method: "personal_sign",
      params: [ethers.hexlify(new TextEncoder().encode(json)), ethereum.selectedAddress]
    });
    event['sig'] = sig;
    send('EVENT', event)
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <h1 className="text-gray-700 font-bold text-4xl leading-40 -ml-0.64px mb-4 mt-32">
          Publish cooperation requirements
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mt-8 leading-24 -ml-0.1px">
          Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
        </p>
      </div>
      <div className="flex justify-center p-4 items-start gap-2.5 flex-shrink-0 self-stretch rounded-lg bg-white">
        <form onSubmit={handleSubmit}>
          {/* Project Information */}
          <div className="w-[640px] mb-6 p-4 border rounded-lg">
              <label className="block font-inter font-bold text-lg mb-2 pl-2">Project Information</label>
              <textarea 
                  name="projectInfo"
                  rows={6}
                  value={formData.projectInfo}
                  onChange={handleInputChange}
                  placeholder='Enter project information...'
                  className="w-full p-2 text-tertiary font-inter font-normal text-base leading-5">
              </textarea>
          </div>
          <div className="w-[640px] mb-6 p-4 border rounded-lg">
              <label className="block font-inter font-bold text-lg mb-2 p-2">Cooperation requirements</label>
              <div className="mb-2 relative">
                  <CustomSelect 
                    name="cooperationType"
                    options={['Type 1', 'Type 2']}
                    onOptionSelected={(selected, name) => {
                    // Handle the selected option and the name of the CustomSelect component
                      setFormData(prev => ({ ...prev, [name]: selected }));
                    }}
                    defaultDisplay="Cooperation type" />
              </div>
              <textarea 
                rows={6}
                name="cooperationIntro"
                value={formData.cooperationIntro}
                onChange={handleInputChange}
                placeholder='Enter cooperation introduction...'
                className="w-full p-2 text-tertiary font-inter font-normal text-base leading-5">
              </textarea>
          </div>

          <div className="w-[640px] mb-6 p-4 border rounded-lg">
              <label className="block font-inter font-bold text-lg mb-2 pl-2">Cooperation conditions（Offer）</label>
              <textarea 
                  rows={6}
                  name="cooperationConditions"
                  value={formData.cooperationConditions}
                  onChange={handleInputChange}
                  placeholder='Enter non-financial criteria (e.g. brand presence)...'
                  className="w-full p-2 text-tertiary font-inter font-normal text-base leading-5">
              </textarea>
          </div>

          {/* Cooperation Fees */}
          <div className="mb-6 p-4 border rounded-lg">
            <label className="block font-inter font-bold text-lg mb-2 pl-2">Cooperation Fees</label>
            <div className="mb-2 pl-2">
              <label className="block text-sm mb-1">Amount</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  step="0.01" 
                  className="w-32 p-2 text-2xl font-bold" 
                  placeholder="0.0"
                />
                <CustomSelect 
                  name="currency"
                  options={['USD', 'EUR']} 
                  onOptionSelected={(selected, name) => {
                    // Handle the selected option and the name of the CustomSelect component
                    setFormData(prev => ({ ...prev, [name]: selected }));
                  }}
                  defaultDisplay="Select Currency"
                  className="w-40 ml-2"
                />

              </div>
            </div>

            <textarea 
              className="w-full p-2 mb-4" 
              placeholder='Enter non-financial criteria (e.g. brand presence)...'
              name="nonFinancialCriteria"
              value={formData.nonFinancialCriteria}
              onChange={handleInputChange}
            >
            </textarea>

            <label className="block font-inter font-bold text-lg mb-2 pl-2">Expiry Time</label>
            <div className="flex space-x-4">
                <input type="date" className="p-2 text-lg border rounded w-52" />
                <input type="number" placeholder="Hour" min="0" max="23" className="p-2 text-lg w-24 border rounded" />
                <input type="number" placeholder="Minute" min="0" max="59" className="p-2 text-lg w-24 border rounded" />
            </div>
          </div>


          <button 
            type="submit" 
            className="w-[640px] flex justify-center items-center w-624 px-18 py-3 space-x-1.5 bg-purple-600 text-white rounded-full shadow-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default PostRequirements;