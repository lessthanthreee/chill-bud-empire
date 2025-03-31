
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Cannabis } from "lucide-react";

const AgeVerification = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const verified = localStorage.getItem("age-verified");
    if (!verified) {
      setIsOpen(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("age-verified", "true");
    setIsOpen(false);
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Cannabis className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">Age Verification</DialogTitle>
          <DialogDescription className="text-center">
            You must be 21 years or older to enter this website.
          </DialogDescription>
        </DialogHeader>
        <div className="px-4 py-6 text-center">
          <p className="mb-6">
            By clicking "I'm 21 or older", you confirm that you are of legal age to view 
            and purchase Delta-8 products in the state of Ohio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={handleReject}>
              I'm under 21
            </Button>
            <Button onClick={handleVerify} className="bg-primary hover:bg-primary/90">
              I'm 21 or older
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerification;
