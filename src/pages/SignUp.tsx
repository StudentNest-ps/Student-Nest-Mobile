
import React from 'react';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { SignUpForm } from '../components/Auth/SignUpForm';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/button';

const SignUp = () => {
  const navigate = useNavigate();
  
  return (
    <MobileLayout>
      <div className="space-y-6 py-8">
        <SignUpForm />
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Already have an account?
          </p>
          <Button 
            variant="outline"
            onClick={() => navigate('/signin')}
            className="w-full"
          >
            Sign In
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SignUp;
