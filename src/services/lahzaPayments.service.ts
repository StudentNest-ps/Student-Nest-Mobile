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
  /**
   * Redirects the user to the Lahza payment gateway
   * @param checkoutUrl The URL provided by the payment initiation
   */
  redirectToPaymentGateway(checkoutUrl: string): void {
    window.location.href = checkoutUrl;
  }

  /**
   * Handles the payment success callback
   * This method should be called when the user is redirected back from Lahza
   * @param transactionId The transaction ID from the payment
   * @returns Promise resolving to the payment status
   */
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

  /**
   * Initiates payment and redirects to Lahza checkout page
   * @param bookingId The ID of the booking to pay for
   */
  async payForBooking(bookingId: string): Promise<void> {
    try {
      const { checkout_url } = await this.initiatePayment(bookingId);
      this.redirectToPaymentGateway(checkout_url);
    } catch (error) {
      console.error('Failed to process payment:', error);
      throw error;
    }
  }

  /**
   * Initiates a payment for a booking through Lahza payment gateway
   * @param bookingId The ID of the booking to pay for
   * @returns Payment initiation response with checkout URL
   */
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