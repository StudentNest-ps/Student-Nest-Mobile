import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { Check, X } from 'lucide-react';
import { Button } from '../components/UI/button';
import { lahzaPaymentsService } from '../services/lahzaPayments.service';
import { bookingService } from '../services/booking.service';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get transaction_id from URL query parameters
        const params = new URLSearchParams(location.search);
        const transactionId = params.get('reference');
        const bookingId = params.get('booking_id');
        
        if (!transactionId) {
          throw new Error('No transaction reference found');
        }
        
        if (bookingId) {
          setBookingId(bookingId);
        }
        
        const result = await lahzaPaymentsService.handlePaymentCallback(transactionId);
        
        if (result.status === 'completed') {
          // If payment is successful, update the booking status to confirmed
          if (bookingId) {
            try {
              await bookingService.approveBooking(bookingId);
            } catch (error) {
              console.error('Failed to update booking status:', error);
              // Continue with success flow even if booking status update fails
              // The admin can manually update the status if needed
            }
          }
          
          setSuccess(true);
          toast.success('Payment successful!');
        } else {
          throw new Error(result.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        toast.error(error.message || 'Payment verification failed');
        setSuccess(false);
      } finally {
        setVerifying(false);
      }
    };
    
    verifyPayment();
  }, [location.search]);
  
  const handleViewBookings = () => {
    navigate('/bookings');
  };
  
  const handleGoBack = () => {
    navigate('/apartments');
  };
  
  if (verifying) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Verifying your payment...</p>
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center h-[60vh]">
        {success ? (
          <>
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-300" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Your booking has been confirmed. You can now view it in your bookings.
            </p>
            <Button onClick={handleViewBookings}>View My Bookings</Button>
          </>
        ) : (
          <>
            <div className="rounded-full bg-red-100 dark:bg-red-900 p-3 mb-4">
              <X className="w-8 h-8 text-red-600 dark:text-red-300" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Payment Failed</h2>
            <p className="text-muted-foreground mb-6 text-center">
              We couldn't process your payment. Please try again or contact support.
            </p>
            <Button onClick={handleGoBack}>Back to Properties</Button>
          </>
        )}
      </div>
    </MobileLayout>
  );
};

export default PaymentSuccess;