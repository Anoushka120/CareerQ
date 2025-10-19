import Layout from "@/components/layout/Layout";

export default function AccessDenied() {
  return (
    <Layout>
      <div className="min-h-[60vh] grid place-items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Access Denied</h1>
          <p className="text-white/70 mt-2">You don't have permission to view this page.</p>
        </div>
      </div>
    </Layout>
  );
}
