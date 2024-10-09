import PageHeader from "./_components/pageHeader";

export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <PageHeader/>
        {children}
    </div>
  );
}
