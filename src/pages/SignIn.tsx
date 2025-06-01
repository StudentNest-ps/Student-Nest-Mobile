
import React from 'react';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { SignInForm } from '../components/Auth/SignInForm';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/button';

const SignIn = () => {
  const navigate = useNavigate();
  
  return (
    <MobileLayout>
      <div className="space-y-6 py-8">
        <SignInForm />
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Don't have an account?
          </p>
          <Button 
            variant="outline"
            onClick={() => navigate('/signup')}
            className="w-full"
          >
            Create an Account
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SignIn;
