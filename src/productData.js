import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import { MDBContainer, MDBRow,  MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn} from 'mdb-react-ui-kit';


const Products = () => {
  const [products, setProducts] = useState([]);

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
    <div>
      <h1 className='my-5'>Our Product List</h1>
            <MDBContainer>
                        <MDBRow>    
                              {products.map(product => (
                              <MDBCol className='col-md-3'>
                                      <MDBCard>
                                        <MDBCardImage src={product.images[0]?.src} position='top' alt='{product.name}' />
                                        <MDBCardBody className='p-3'>
                                          <MDBCardTitle className='h6' key={product.id}>{product.name}</MDBCardTitle>
                                          <MDBCardText>
                                            {product.price} tk
                                          </MDBCardText>
                                          <a href={product.permalink} target="_blank" rel="noopener noreferrer"><MDBBtn>Add to Cart</MDBBtn></a>
                                        </MDBCardBody>
                                      </MDBCard><br/>
                              </MDBCol>
                              ))}
                        </MDBRow>
            </MDBContainer>
    </div>
  );
};

export default Products;