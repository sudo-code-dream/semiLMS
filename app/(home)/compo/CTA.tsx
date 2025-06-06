import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <section className='py-20 bg-primary text-white'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold mb-6'>
          Ready to Simplify Learning and Teaching?
        </h2>
        <p className='text-xl mb-8 max-w-2xl mx-auto'>
          Join learners and teachers using Fudemy to elevate education
          everywhere.
        </p>
        <Button size='lg' onClick={handleRedirect} variant='secondary'>
          Start Learning
        </Button>
      </div>
    </section>
  );
}
