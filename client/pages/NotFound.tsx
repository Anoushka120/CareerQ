import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] grid place-items-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-2">404</h1>
          <p className="text-xl text-white/80 mb-6">Oops! Page not found</p>
          <a href="/" className="inline-flex rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2.5">Return Home</a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
