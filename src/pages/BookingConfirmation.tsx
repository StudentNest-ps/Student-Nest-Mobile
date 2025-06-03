
import React, { useState } from 'react';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Calendar, Check, MapPin, Info, CreditCard, ArrowLeft } from 'lucide-react';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { format, addDays, differenceInDays, differenceInMonths, addMonths } from 'date-fns';
import { toast } from 'sonner';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const apartment = location.state?.apartment;
  
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addMonths(new Date(), 12)); // Default to 12 months
  const [paymentStep, setPaymentStep] = useState<'dates' | 'payment' | 'confirmation'>('dates');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formValues, setFormValues] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [formErrors, setFormErrors] = useState({
    cardNumber: false,
    expDate: false,
    cvv: false,
    cardholderName: false
  });
  
  if (!apartment) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Info className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Apartment Not Found</h2>
          <p className="text-muted-foreground mb-6">We couldn't find the apartment you're looking for.</p>
          <Button onClick={() => navigate('/apartments')}>Browse Apartments</Button>
        </div>
      </MobileLayout>
    );
  }
  
  const calculateTotalMonths = () => {
    // Calculate months difference, with a minimum of 1 month
    const months = Math.max(differenceInMonths(endDate, startDate), 1);
    
    // If there are additional days beyond full months, round up to the next month
    const fullMonthsEnd = addMonths(startDate, months);
    const hasExtraDays = differenceInDays(endDate, fullMonthsEnd) > 0;
    
    return hasExtraDays ? months + 1 : months;
  };
  
  const calculateTotalPrice = () => {
    const months = calculateTotalMonths();
    const monthlyRate = parseInt(apartment.price.replace(/[$,]/g, ''));
    return monthlyRate * months;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear the error when user types
    setFormErrors(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const validateForm = () => {
    const errors = {
      cardNumber: formValues.cardNumber.trim() === '',
      expDate: formValues.expDate.trim() === '',
      cvv: formValues.cvv.trim() === '',
      cardholderName: formValues.cardholderName.trim() === ''
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleProcessPayment = () => {
    if (!validateForm()) {
      toast.error("Please fill in all payment fields");
      return;
    }
    
    setIsProcessingPayment(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentStep('confirmation');
      toast.success("Payment successful!");
    }, 1500);
  };
  
  const handleConfirmBooking = () => {
    navigate('/profile');
    toast.success(`You've successfully booked ${apartment.name} for ${calculateTotalMonths()} months!`);
  };

  const handleBackToApartment = () => {
    navigate(`/apartments`);
  };
  
  const renderDateSelection = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBackToApartment}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Select Booking Dates</h1>
        </div>
        <p className="text-muted-foreground">
          Choose your move-in and move-out dates for {apartment.name}.
        </p>
        
        <div className="bg-card border border-border rounded-lg overflow-hidden p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Move-in Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(startDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Move-out Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(endDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    disabled={(date) => date <= startDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex justify-between mb-2">
              <span>Duration</span>
              <span className="font-semibold">{calculateTotalMonths()} months</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Monthly Rate</span>
              <span className="font-semibold">{apartment.price}</span>
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-border">
              <span className="font-bold">Total Price</span>
              <span className="font-bold text-apartment dark:text-primary">
                ${calculateTotalPrice().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          size="lg"
          onClick={() => setPaymentStep('payment')}
        >
          Proceed to Payment
        </Button>
      </div>
    );
  };
  
  const renderPayment = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setPaymentStep('dates')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Payment Details</h1>
        </div>
        <p className="text-muted-foreground">
          Complete your booking by providing payment information.
        </p>
        
        <div className="bg-card border border-border rounded-lg overflow-hidden p-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Card Number<span className="text-red-500">*</span>
              </label>
              <div className={`flex border ${formErrors.cardNumber ? 'border-red-500' : 'border-border'} rounded-md p-2`}>
                <CreditCard className="text-muted-foreground mr-2" />
                <input 
                  type="text" 
                  name="cardNumber"
                  placeholder="4242 4242 4242 4242" 
                  className="bg-transparent flex-1 outline-none text-foreground"
                  value={formValues.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {formErrors.cardNumber && (
                <p className="text-red-500 text-xs mt-1">Card number is required</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Expiration Date<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="expDate"
                  placeholder="MM/YY" 
                  className={`w-full p-2 border ${formErrors.expDate ? 'border-red-500' : 'border-border'} rounded-md bg-background text-foreground`}
                  value={formValues.expDate}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.expDate && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  CVV<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="cvv"
                  placeholder="123" 
                  className={`w-full p-2 border ${formErrors.cvv ? 'border-red-500' : 'border-border'} rounded-md bg-background text-foreground`}
                  value={formValues.cvv}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.cvv && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Cardholder Name<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="cardholderName"
                placeholder="John Doe" 
                className={`w-full p-2 border ${formErrors.cardholderName ? 'border-red-500' : 'border-border'} rounded-md bg-background text-foreground`}
                value={formValues.cardholderName}
                onChange={handleInputChange}
                required
              />
              {formErrors.cardholderName && (
                <p className="text-red-500 text-xs mt-1">Cardholder name is required</p>
              )}
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex justify-between mb-2">
              <span>Booking Period</span>
              <span className="font-semibold">{format(startDate, "PP")} - {format(endDate, "PP")}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Months</span>
              <span className="font-semibold">{calculateTotalMonths()} months</span>
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-border">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold text-apartment dark:text-primary">
                ${calculateTotalPrice().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleProcessPayment}
          disabled={isProcessingPayment}
        >
          {isProcessingPayment ? "Processing..." : "Confirm Payment"}
        </Button>
      </div>
    );
  };
  
  const renderConfirmation = () => {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mb-4">
          <Check className="w-8 h-8 text-green-600 dark:text-green-300" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Booking Successful!</h2>
        <p className="text-muted-foreground mb-6 text-center">
          Your booking for {apartment.name} from {format(startDate, "PPP")} to {format(endDate, "PPP")} has been confirmed.
        </p>
        <Button onClick={handleConfirmBooking}>View My Bookings</Button>
      </div>
    );
  };
  
  return (
    <MobileLayout>
      {paymentStep === 'dates' && renderDateSelection()}
      {paymentStep === 'payment' && renderPayment()}
      {paymentStep === 'confirmation' && renderConfirmation()}
    </MobileLayout>
  );
};

export default BookingConfirmation;
