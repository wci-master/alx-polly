import { ToastExamples } from "@/components/examples/toast-examples";

export default function ToastExamplesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Toast Component Examples</h1>
      <p className="text-center mb-8 text-muted-foreground">
        Click the buttons below to see different toast notifications in action
      </p>
      <ToastExamples />
    </div>
  );
}