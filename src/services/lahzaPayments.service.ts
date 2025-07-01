import api from './api';
import { bookingService } from './booking.service';
import { useNavigate } from 'react-router-dom';

export interface PaymentInitiationResponse {
  checkout_url: string;
  transaction_id: string;
}

export interface PaymentStatus {
  status: 'pending' | 'completed' | 'failed';
  message: string;
}

class LahzaPaymentsService {
  redirectToPaymentGateway(checkoutUrl: string): void {
    window.location.href = checkoutUrl;
  }
  async handlePaymentCallback(transactionId: string): Promise<PaymentStatus> {
    try {
      // You might want to verify the payment status with your backend
      const response = await api.get(`/payments/verify/${transactionId}`);
      return response.data;
    } catch (error: any) {
      console.error('Payment verification failed:', error);
      return {
        status: 'failed',
        message: error?.response?.data?.detail || error?.message || 'Payment verification failed'
      };
    }
  }

  async payForBooking(bookingId: string): Promise<void> {
    try {
      const { checkout_url } = await this.initiatePayment(bookingId);
      this.redirectToPaymentGateway(checkout_url);
    } catch (error) {
      console.error('Failed to process payment:', error);
      throw error;
    }
  }

  async initiatePayment(bookingId: string): Promise<PaymentInitiationResponse> {
    try {
      // This endpoint should fetch the booking details including the price from the database
      const response = await api.post(`/payments/initiate/${bookingId}`);
      return response.data;
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      throw new Error(error?.response?.data?.detail || error?.message || 'Payment initiation failed');
    }
  }
}

export const lahzaPaymentsService = new LahzaPaymentsService();