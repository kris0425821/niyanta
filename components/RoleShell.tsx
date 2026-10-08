import Sidebar from "./Sidebar";

type RoleShellProps = {
  children: React.ReactNode;
  role: string;
  name: string;
};

export default function RoleShell({
  children,
  role,
  name,
}: RoleShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar role={role} name={name} />

      <main className="ml-64 min-h-screen">
        <div className="mx-auto max-w-7xl p-8">
          {children}
        </div>
      </main>
    </div>
  );
}