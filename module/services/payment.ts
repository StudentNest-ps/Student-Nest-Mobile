import axios from 'axios';
import { token } from './token';

class Payment {
  async initiatePayment(bookingId: string) {
    const res = await axios.post(
      `/api/sn/api/lahza/initiate/${bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    // return res.data;
  }
}

const payment = new Payment();
export default payment;
