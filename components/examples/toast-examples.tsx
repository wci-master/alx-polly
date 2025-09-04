'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ToastExamples() {
  const { toast, success, error, warning, info } = useToast();

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Toast Examples</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => {
            toast({
              title: "Default Toast",
              description: "This is a default toast notification",
            });
          }}
        >
          Default Toast
        </Button>

        <Button
          variant="destructive"
          onClick={() => {
            error({
              title: "Error Toast",
              description: "This is an error toast notification",
            });
          }}
        >
          Error Toast
        </Button>

        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={() => {
            success({
              title: "Success Toast",
              description: "This is a success toast notification",
            });
          }}
        >
          Success Toast
        </Button>

        <Button
          className="bg-yellow-500 hover:bg-yellow-600"
          onClick={() => {
            warning({
              title: "Warning Toast",
              description: "This is a warning toast notification",
            });
          }}
        >
          Warning Toast
        </Button>

        <Button
          className="bg-blue-500 hover:bg-blue-600 col-span-2"
          onClick={() => {
            info({
              title: "Info Toast",
              description: "This is an info toast notification",
            });
          }}
        >
          Info Toast
        </Button>
      </div>
    </div>
  );
}