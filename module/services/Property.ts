import axios from 'axios';
import { token } from './token';
import { Property as IProperty } from '../types/Admin';
class Property {
  async getPropertyById(propertyId: string) {
    const res = await axios.get(`/api/sn/api/properties/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);

    return res.data as IProperty;
  }
  
}

const property = new Property();

export default property;
