import React, { useState } from 'react';
import './App.css';

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBCardImage,
} from 'mdb-react-ui-kit';


export default function ViewProduct({data,toggleOpen,currentModal,setCurrentModal}) {
 
  return (
    <>  
      
      <MDBModal tabIndex='-1' open={currentModal} onClose={() => setCurrentModal(false)} className='modal-backdrop'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{data?.name}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>toggleOpen(data)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                 <MDBRow>
                     <div className="d-flex">
                          <div className="p-2">
                               <MDBCardImage src={data?.images?.[0]?.src} position='top' alt='?.?.?.' width={350} height={350}/>
                          </div>
                          <div className="p-2 w-75">
                               <p className='h5 text-start'>Product Code: {data?.id}</p>
                               <p className='h5 text-start'>Price: {data?.price} tk</p>
                               <p className='' style={{textAlign:'justify'}}>{data?.description}</p>
                               <a href={data?.permalink} target="_blank" rel="noopener noreferrer"><MDBBtn className='bg-primary'>Buy Now</MDBBtn></a>
                          </div>
                    </div>
                 </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
          
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}