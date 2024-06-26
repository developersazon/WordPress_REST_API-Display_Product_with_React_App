import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import ViewProduct from './viewProduct';
import {
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle,
  MDBCardText, MDBBtn, MDBBtnGroup
} from 'mdb-react-ui-kit';



const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState({});
  const [currentModal, setCurrentModal] = useState(false);
  const toggleOpen = (product) => {
    setModalProduct(product);
    setCurrentModal(!currentModal)
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://demo.aamar.digital/wp-json/wc/v3/products', {
          auth: {
            username: 'ck_f64549fea313a5d1f95b02c62a4a924e1806185a',
            password: 'cs_847e8e61884f73797be1a960bee0a677c0d1f13f'
          }
        });
        const sanitizedProducts = response.data.map(product => ({
          ...product,
          name: sanitizeHtml(product.name, { allowedTags: [], allowedAttributes: {} }),
          description: sanitizeHtml(product.description, { allowedTags: [], allowedAttributes: {} })
        }));
        setProducts(sanitizedProducts);
      } catch (error) {
        console.error('Error fetching the products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className='my-5'>Our Latest Product</h1>
      <MDBContainer>
        <MDBRow>
          {products.map(product => (
            <MDBCol className='col-md-3' key={product.id}>
              <MDBCard>
                <div onClick={() => toggleOpen(product)} className='bg-image hover-overlay'>
                  <MDBCardImage src={product.images[0]?.src} position='top' alt={product.name} />
                  <a href='#'>
                    <div className='mask overlay' style={{ backgroundColor: 'rgba(57, 192, 237, 0.2)' }}></div>
                  </a>
                </div>
                <MDBCardBody className='p-3'>
                  <MDBCardTitle className='h6'>{product.name}</MDBCardTitle>
                  <MDBCardText>{product.price} tk</MDBCardText>
                  <MDBBtnGroup>
                    <MDBBtn onClick={() => toggleOpen(product)}>View</MDBBtn>
                    <ViewProduct data={modalProduct} currentModal={currentModal} setCurrentModal={setCurrentModal} toggleOpen={toggleOpen} />
                    <a href={product.permalink} target="_blank" rel="noopener noreferrer"><MDBBtn color='light'>Add to Cart</MDBBtn></a>
                  </MDBBtnGroup>
                </MDBCardBody>
              </MDBCard><br />
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Products;
