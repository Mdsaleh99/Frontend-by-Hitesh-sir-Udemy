import ContactForm from "@/components/ContactForm";


export default function Home() {

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Server actions Demo</h1>
          <p className="text-xl text-gray-400 max-2xL mx-auto">
            Contact form with MongoDb and revalidation
          </p>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
