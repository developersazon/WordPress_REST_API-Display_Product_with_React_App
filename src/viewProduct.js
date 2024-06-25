import React, { useState } from 'react';
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


export default function ViewProduct(data) {
  const [centredModal, setCentredModal] = useState(false);
  const toggleOpen = () => setCentredModal(!centredModal);
 
  return (
    <>  
      
      <MDBBtn onClick={toggleOpen}>View</MDBBtn> 
      <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{data.product.name}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                 <MDBRow>
                     <div className="d-flex">
                          <div className="p-2 flex-shrink-1">
                               <MDBCardImage className='img-thumbnail' src={data.product.images[0]?.src} position='top' alt='...'/>
                          </div>
                          <div className="p-2 w-75">
                               <p className='h4 text-start'>{data.product.title}</p>
                               <p className='h3 text-start justify-content'>Price: {data.product.price} tk</p>
                               <p className='text-start justify-content'>{data.product.description}</p>
                               <a href={data.product.permalink} target="_blank" rel="noopener noreferrer"><MDBBtn className='bg-primary'>Buy Now</MDBBtn></a>
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